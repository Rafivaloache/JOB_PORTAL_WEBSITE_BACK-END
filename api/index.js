// Vercel serverless entry point.
// Exports the Express app directly — Vercel expects a plain
// (req, res) => {} handler, which an Express app already is.
// Socket.IO is NOT attached here since serverless functions
// can't hold persistent connections between invocations.
import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";

export default async function handler(req, res) {
    await connectDB();
    return app(req, res);
}
