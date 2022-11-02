import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer = undefined;
export const connectDatabase = async () => {
  mongoServer = await MongoMemoryServer.create();
  const url = mongoServer.getUri();
  await mongoose.createConnection(url);
};

/**
 * Drop database, close the connection and stop mongod.
 */
export const dropDatabase = async () => {
  if (mongoServer) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  }
};

/**
 * Remove all the data for all db collections.
 */
export const dropCollections = async () => {
  if (mongoServer) {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany();
    }
  }
};
