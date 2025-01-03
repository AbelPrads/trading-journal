import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import { PORT , MONGO_URI } from "./config.js";
import DashboardRoutes from './1-routes/dashboardRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    .connect(MONGO_URI)
    .then(() => {
        console.log('Successfully Connected to trading-journal database');

        app.listen(PORT, () => { 
            console.log(`Server running on port: ${PORT}`);
            });
    })
    .catch(() => {
        console.log(error);
    });

app.get('/', (request, response) => {
    response.status(241).send('Welcome to Trading Journal by Abel Prado');
    console.log("Success");
    });


// ROUTES 
app.use('/dashboard', DashboardRoutes)

