import dotenv from "dotenv";
import app from "./app.js";
import { Server } from "socket.io";
import http from "http";
import { connectDB } from "./config/db.js";

dotenv.config()

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true
    }
});

app.set("io", io);

io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
    });
});

// Connect to MongoDB when the server starts
await connectDB();

// Only start listening when running locally.
// Vercel will use the exported server.
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 5000;

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default server;