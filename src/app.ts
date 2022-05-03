import config from './config';
import express from 'express';
import loaders from './loaders';

async function start() {
  const app = express();

  await loaders.init({ expressApp: app });

  app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
  });
}

start();
