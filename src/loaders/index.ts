import { Express } from 'express';
import expressLoader from './expressLoader';

const init = async ({ expressApp }: { expressApp: Express }) => {
  await expressLoader({ app: expressApp });
};

export default { init };
