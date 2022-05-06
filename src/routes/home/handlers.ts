import { Request, Response } from 'express';

import { AuthUser } from '../../types/user';

export const home = async (req: Request, res: Response) => {
  const user = AuthUser.getUserFromRequest(req);

  return res.render('home', {
    ['page_data']: JSON.stringify({
      user,
      ideas: [{ name: 'experiencer', template: 'app' }],
      templates: [
        { id: 1, name: 'app', fields: ['name', 'priority', 'notes'] },
      ],
    }),
    isAuthenticated: req.oidc.isAuthenticated(),
  });
};
