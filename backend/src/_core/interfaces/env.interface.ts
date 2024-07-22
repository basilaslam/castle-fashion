export interface IEnvironmentVariables {
  ENVIRONMENT: string | undefined;
  ENVIRONMENT_MAINTENANCE: string | undefined;
  PORT: string | undefined;
  DB_CONNECTION_STRING: string | undefined;
  DB_CONNECTION_STRING_LOCAL: string | undefined;
  JWT_EXPIRY: string | undefined;
  JWT_SECRET_KEY: string | undefined;
  WEBCASTLE_ACCESS_KEY: string | undefined;
  WEBCASTLE_SECRET_KEY: string | undefined;
  WEBCASTLE_CRYPTO_KEY: string | undefined;
}
