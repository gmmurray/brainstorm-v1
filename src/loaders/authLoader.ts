import { ConfigParams, auth } from 'express-openid-connect';

import { Application } from 'express';
import appConfig from '../config';

const config: ConfigParams = {
  authRequired: false,
  auth0Logout: true,
  secret: appConfig.authSecret,
  baseURL: appConfig.baseUrl,
  clientID: appConfig.authClientId,
  issuerBaseURL: appConfig.authBaseUrl,
  routes: {
    postLogoutRedirect: '/',
  },
};

const authLoader = async (app: Application) => {
  app.use(auth(config));
};

export default authLoader;
