import dotenv from "dotenv";
import app from "./app.js";


import { connectDB } from "./config/db.js";

dotenv.config()







// Connect to MongoDB when the server starts
await connectDB();

// Only start listening when running locally.
// Vercel will use the exported server.
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;