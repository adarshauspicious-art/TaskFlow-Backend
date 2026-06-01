import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected Succesfully 🚀  ")
    } catch (error) {
            console.log(error.message);
            process.exit(1);
    }
};
export default connectDb;