import { AuthUser } from 'types/user';
import { Response } from 'express';

export function pageWithData<T>(
  res: Response,
  pageName: string,
  user: AuthUser,
  pageData?: T,
) {
  const data = JSON.stringify({ ...(pageData ?? {}), user });

  return res.render(pageName, {
    ['page_data']: data,
  });
}
