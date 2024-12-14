import dotenvflow from 'dotenv-flow';

dotenvflow.config();

export default {
  ENV: process.env.ENV,
  PORT: process.env.PORT,
  SERVER_URL: process.env.SERVER_URL,
  MONGO_DB_URL: process.env.MONGO_DB_URL as string,
  CLIENT_URL: process.env.CLIENT_URL as string
};
