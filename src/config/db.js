import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// Cache the connection PROMISE (not just a boolean) on the global object.
// In serverless, module state can persist across warm invocations, but a
// boolean flag can lie if the underlying socket died. Caching the promise
// means concurrent requests during a cold start all await the same
// in-flight connect() instead of racing to connect multiple times.
let cached = global._mongoose;
if (!cached) {
    cached = global._mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL is not defined");
    }

    // Reuse an existing connection ONLY if we can prove it's actually alive.
    // readyState === 1 is not enough on Vercel: it just reflects what our
    // process last knew before being frozen, and can't detect a socket
    // that Atlas or the network closed while we were paused. A real ping
    // forces a round trip right now, so a dead socket fails fast and
    // cleanly here instead of crashing deep inside a real query later.
    if (cached.conn && mongoose.connection.readyState === 1) {
        try {
            await mongoose.connection.db.admin().ping();
            return cached.conn;
        } catch (err) {
            console.warn("Cached MongoDB connection failed ping, reconnecting:", err.message);
            cached.conn = null;
            cached.promise = null;
        }
    }

    // A previous connection attempt exists but the socket is no longer
    // healthy (e.g. serverless froze mid-connection, or Atlas dropped it) —
    // drop the stale promise so we reconnect instead of hanging forever.
    if (cached.conn && mongoose.connection.readyState !== 1) {
        cached.conn = null;
        cached.promise = null;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(process.env.MONGO_URL, {
                serverSelectionTimeoutMS: 10000,
                // Keep at least one socket warm so serverless invocations
                // don't each pay a fresh handshake cost.
                maxPoolSize: 5,
                // Recycle idle sockets proactively instead of letting them
                // go stale during a freeze/thaw gap.
                maxIdleTimeMS: 10000,
                heartbeatFrequencyMS: 10000,
            })
            .then((m) => {
                console.log("MongoDB connected:", m.connection.host);
                return m;
            })
            .catch((error) => {
                // Clear the cached promise on failure so the NEXT request
                // retries instead of being stuck awaiting a rejected promise.
                cached.promise = null;
                console.error("MongoDB connection error:", error.message);
                throw error;
            });
    }

    cached.conn = await cached.promise;

    // If the connection drops later (idle timeout, Atlas pause, network
    // blip), invalidate the cache so the next request reconnects instead
    // of buffering against a dead connection.
    mongoose.connection.removeAllListeners("disconnected");
    mongoose.connection.on("disconnected", () => {
        console.warn("MongoDB disconnected — will reconnect on next request");
        cached.conn = null;
        cached.promise = null;
    });

    return cached.conn;
};