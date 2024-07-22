import express, { type Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './_core/utils/db/db.util';
import { getEnv } from './_core/config/env.config';

import authRoute from './routes/auth.route';
import productRoute from './routes/product.route';
import userRoute from './routes/user.route';

const app: Application = express();

async function runApp() {
  const env = await getEnv();
  console.log('@environment ', env);
  
  // Middleware
  app.use(helmet()); // Apply standard security headers
  app.use(
    cors({
      exposedHeaders: ['X-WebCastle-DateTime'],
    }),
  ); // Enable CORS for all routes
  app.use(express.json());

  // Routes

  app.use('/api', authRoute);
  app.use('/api', productRoute)
  app.use('/api', userRoute)

  // Connect to MongoDB
  connectDB();

  // Start the HTTPS server
  app.listen(Number(env?.PORT) || 5000, () => {
    console.log('@environment ', env?.ENVIRONMENT);
    console.log('@port ', Number(env?.PORT));
    console.log('@environment ', env);
  });
}

runApp();
