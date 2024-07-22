import mongoose from "mongoose";

async function connectsToDB() {
  mongoose.connect(process.env.DB_CONNECTION_STRING);
  return mongoose.connection;
}

export default connectsToDB;
