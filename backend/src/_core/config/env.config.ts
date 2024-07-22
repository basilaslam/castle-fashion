require('dotenv').config();
import { IEnvironmentVariables } from '../interfaces/env.interface';

export const getEnv = async (): Promise<IEnvironmentVariables> => {
  const env = {
    ENVIRONMENT: process.env.ENVIRONMENT,
    ENVIRONMENT_MAINTENANCE: process.env.ENVIRONMENT_MAINTENANCE,
    PORT: process.env.PORT,
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    DB_CONNECTION_STRING_LOCAL: process.env.DB_CONNECTION_STRING_LOCAL,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    WEBCASTLE_ACCESS_KEY: process.env.WEBCASTLE_ACCESS_KEY,
    WEBCASTLE_SECRET_KEY: process.env.WEBCASTLE_SECRET_KEY,
    WEBCASTLE_CRYPTO_KEY: process.env.WEBCASTLE_CRYPTO_KEY
  };

  // Check if any property is undefined or null
  const missingVariables = Object.entries(env).filter(
    ([, value]) => value === undefined || value === null || value === 'null',
  );

  if (missingVariables.length > 0) {
    const missingProps = missingVariables.map(([key]) => key).join(', ');
    throw new Error(`Missing environment variables: ${missingProps}`);
  }

  return env;
};
