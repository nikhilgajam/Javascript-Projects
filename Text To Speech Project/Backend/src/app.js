import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middlewares.js';
import healthcheckRouter from './routes/healthcheck.routes.js';
import userRouter from './routes/convert.routes.js';

// Defining express app object
const app = express();

// Setting Middlewares
app.use(cors({
  origin: '*',
}));
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public")); // for serving static files in the directory public

// Routes
app.use('/api/v1/healthcheck', healthcheckRouter);
app.use('/api/v1/convert', userRouter);

// Error Handling
app.use(errorHandler);

export { app };
