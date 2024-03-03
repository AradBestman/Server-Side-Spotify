import { Logger } from "../logs/logger";
import mongoose from "mongoose";
import { initSongs } from "../initSongs";

const connect = async () => {
  try {
    //read the connection string from dotenv file:
    const connectionString = process.env.DB_CONNECTION_STRING;

    if (!connectionString) {
      Logger.error("DB_CONNECTION_STRING IS NOT DEFINED IN your .env file");
      return;
    }

    //connect to the database:
    await mongoose.connect(connectionString);
    await initSongs();

    Logger.success("Database Connected");
    //init the database:
  } catch (err) {
    Logger.error("Error Connecting to database", err);
  }
};
export { connect };
