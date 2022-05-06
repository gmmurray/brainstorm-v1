import { Request, Response } from 'express';

export const landing = async (req: Request, res: Response) => {
  const isAuthenticated = req.oidc.isAuthenticated();
  if (isAuthenticated) {
    return res.redirect('/home');
  }
  res.render('landing', {
    isAuthenticated,
  });
};
