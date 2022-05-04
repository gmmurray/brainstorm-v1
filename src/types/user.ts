import { Request } from 'express';

export interface IAuthUser {
  name: string;
  picture: string;
  email: string;
  sub: string;
}

export class AuthUser implements IAuthUser {
  public name: string;
  public picture: string;
  public email: string;
  public sub: string;

  constructor(user: IAuthUser) {
    this.name = user.name;
    this.picture = user.picture;
    this.email = user.email;
    this.sub = user.sub;
  }

  public static getUserFromRequest = (request: Request) =>
    new AuthUser(request.oidc.user as IAuthUser);
}
