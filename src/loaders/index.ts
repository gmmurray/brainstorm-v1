import { Express } from 'express';
import expressLoader from './expressLoader';
import hbsLoader from './hbsLoader';
import liveReloadLoader from './liveReloadLoader';

const init = async ({ expressApp }: { expressApp: Express }) => {
  await hbsLoader(expressApp);
  await liveReloadLoader(expressApp);
  await expressLoader({ app: expressApp });
};

export default { init };
