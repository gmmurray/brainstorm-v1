import appConfig from '../config';
import mongoose from 'mongoose';

const mongooseLoader = async () => {
  const connectionString = appConfig.mongodbConnectionString;
  if (connectionString) {
    await mongoose.connect(connectionString);
    console.log('Database connected');
  }
  return;
};

export default mongooseLoader;
