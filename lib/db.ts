import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const MONGODB_URI = process.env.MONGO_URI;

let isConnected = false;

export const connectDB = async () => {
    mongoose.set("strictQuery", true);

    if (!MONGODB_URI) {
        return console.log("MONGO_URI is not defined");
    }

    if (isConnected) {
        return console.log("=> using existing database connection");
    }

    try {
        await mongoose.connect(MONGODB_URI);

        isConnected = true;

        console.log("Successfully connected to DB!!");
    } catch (error) {
        console.log("Failed to connect to database: ", error);
    }
};
