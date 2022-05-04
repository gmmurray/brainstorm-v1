import express, { Application } from 'express';

import hbs from 'hbs';
import path from 'path';

const hbsLoader = async (app: Application) => {
  app.use('/assets', express.static(path.join(__dirname, '../views/public')));
  hbs.registerPartials(path.join(__dirname, '../views/partials'));
  hbs.registerHelper('json', (content: object) => JSON.stringify(content));
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'html');
  app.engine('html', hbs.__express);
};

export default hbsLoader;
