import { Application } from 'express';
import bodyParser from 'body-parser';
import router from '../routes';

const expressLoader = async ({ app }: { app: Application }) => {
  app.use(bodyParser.json());
  app.use('/', router);
};

export default expressLoader;
