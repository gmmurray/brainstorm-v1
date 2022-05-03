import { Application } from 'express';
import path from 'path';
import router from '../routes';

const expressLoader = async ({ app }: { app: Application }) => {
  app.get('/status', (_, res) => res.status(200).end());

  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'hbs');

  app.use('/', router);
};

export default expressLoader;
