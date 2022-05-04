import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  baseUrl: process.env.BASE_URL,
  authSecret: process.env.AUTH0_SECRET,
  authClientId: process.env.AUTH0_CLIENT_ID,
  authBaseUrl: process.env.AUTH0_BASE_URL,
};
