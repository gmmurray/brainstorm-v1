import appConfig from '../config';
import inMemoryLoader from './inMemoryLoader';
import mongoose from 'mongoose';

const mongooseLoader = async () => {
  if (process.env.NODE_ENV === 'test') {
    console.log('In memory database connected');
    return await inMemoryLoader();
  }

  const connectionString = appConfig.mongodbConnectionString;
  if (connectionString) {
    await mongoose.connect(connectionString);
    console.log('Database connected');
  }
  return;
};

export default mongooseLoader;
