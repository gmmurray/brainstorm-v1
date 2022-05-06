import { Request, Response } from 'express';

import { AuthUser } from 'types/user';

export function pageWithData<T>(
  req: Request,
  res: Response,
  pageName: string,
  user: AuthUser,
  pageData?: T,
  activeRoute?: string,
) {
  const data = JSON.stringify({ ...(pageData ?? {}), user });

  return res.render(pageName, {
    ['page_data']: data,
    isAuthenticated: req.oidc.isAuthenticated(),
    activeRoute,
  });
}
