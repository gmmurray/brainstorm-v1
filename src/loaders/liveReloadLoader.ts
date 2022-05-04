import { Application } from 'express';
import connectLivereload from 'connect-livereload';
import livereload from 'livereload';
import path from 'path';

const liveReloadLoader = async (app: Application) => {
  if (process.env.NODE_ENV === 'development') {
    const server = livereload.createServer();

    server.watch(path.join(__dirname, '../../build'));

    app.use(connectLivereload());

    server.server.once('connection', () => {
      setTimeout(() => {
        server.refresh('/');
      }, 100);
    });
  }
};

export default liveReloadLoader;
