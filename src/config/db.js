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

    // Reuse an existing healthy connection.
    if (cached.conn && mongoose.connection.readyState === 1) {
        return cached.conn;
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
