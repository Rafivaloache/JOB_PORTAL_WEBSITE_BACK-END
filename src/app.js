import express from 'express'
import cors from 'cors'


import dotenv from 'dotenv'
dotenv.config()
import { errorHandler, notFound } from './no-found/errMiddelWare.js'
import cookieParser from 'cookie-parser'
import authRouter from './router/AuthRouter.js'
import jobRouter from './router/jobRouter.js';
import applicationRouter from './router/ApplicationRouter.js';

import profileRouter from './router/ProfileRouter.js';
import saveJobRouter from './router/SaveApplicationRouter.js';

import path from 'path'
import multer from 'multer'
import nodemailer from 'nodemailer';
import generateTextJobOverViewRouter from './router/AiRoute.js';


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./uploads")
//     }
// })





const app = express();;


const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});







app.use(express.json());

app.use(express.urlencoded({ extended: true }));




const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
];


app.use(cors({
    origin: function (origin, callback) {
        // Allow requests without an origin
        // (Postman, server-to-server requests, etc.)
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
}));


app.use(cookieParser())





app.get('/', (req, res) => res.send('Hello World!'));



app.use('/auth/user', authRouter);
app.use('/api/job', jobRouter);
app.use('/api/applied-job', applicationRouter );
app.use('/api/profile', profileRouter);
app.use('/api/save-job',saveJobRouter);
app.use('/api/generate-AI-text', generateTextJobOverViewRouter);


app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));







app.post('/send-email', async (req, res) => {
    const { fullname, email, subject, category, message } = req.body;

    try {
        const info = await transporter.sendMail({
            from: `"Dakio" <${process.env.EMAIL}>`,
            to: email,      // send TO yourself (your inbox), not to the visitor
            replyTo: email,             // so you can reply directly to the visitor
            subject: `${subject} [${category}] `,
            text: message,
        });

        res.status(200).json({ message: "Email sent successfully", messageId: info.messageId });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to send email" });
    }
});




app.use(notFound);




app.use(errorHandler);













export default app
