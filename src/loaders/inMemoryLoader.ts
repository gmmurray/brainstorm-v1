import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let server: MongoMemoryServer;

const inMemoryLoader = async () => {
  await mongoose.disconnect();

  server = await MongoMemoryServer.create();

  const uri = server.getUri();

  await mongoose.connect(uri);
};

export default inMemoryLoader;

export const quitInMemoryDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await server.stop();
};

export const clearInMemoryDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};
