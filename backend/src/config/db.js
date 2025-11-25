import dotenv from "dotenv";
dotenv.config();
import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    await connect(`${process.env.MONGO_URI}/CodeVault`).then((connectionInstence) => {
      console.log(
        `Connected to database ${connectionInstence.connection.host}`
      );
    });
  } catch (error) {
    console.log(`Error connecting to database ${error.message}`);
    process.exit(1);
  }
}

