import { Application } from 'express';
import router from '../routes';

const expressLoader = async ({ app }: { app: Application }) => {
  app.use('/', router);
};

export default expressLoader;
