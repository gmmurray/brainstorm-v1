import { Router } from 'express';

const homeRouter = Router();

homeRouter.get('/', (req, res) => {
  res.render('index', {
    subject: 'stuff',
    name: 'stuffer',
    link: 'google.com',
  });
});

export default homeRouter;
