import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from "dotenv";
import DashboardRoutes from './1-routes/dashboard-routes.js';
import DashboardAnalyticsRoutes from './1-routes/dashboard-analytics-routes.js';


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;


// ALLOW ALL ORIGINS
app.use(cors());

// ALLOW CUSTOM ORIGINS
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET','POST','PUT','DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Successfully Connected to trading-journal database');

        app.listen(PORT, () => { 
            console.log(`Server running on port: ${PORT}`);
            });
    })
    .catch((error) => {
        console.log(`Unable to connect: ${error}`);
    });

// ROUTES 
app.use('/dashboard', DashboardRoutes)
app.use('/dashboard-analytics', DashboardAnalyticsRoutes)
