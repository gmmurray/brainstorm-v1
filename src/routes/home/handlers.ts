import { AuthUser, IAuthUser } from '../../types/user';
import { Request, Response } from 'express';

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
  });
};
