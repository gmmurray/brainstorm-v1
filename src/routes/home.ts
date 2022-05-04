import { Router } from 'express';

const homeRouter = Router();

homeRouter.get('/', (req, res) => {
  res.render('home', {
    ['page_data']: JSON.stringify({
      user: { name: 'greg', id: 123 },
      ideas: [{ name: 'experiencer', template: 'app' }],
      templates: [
        { id: 1, name: 'app', fields: ['name', 'priority', 'notes'] },
      ],
    }),
  });
});

export default homeRouter;
