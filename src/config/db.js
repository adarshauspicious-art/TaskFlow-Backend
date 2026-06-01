import mongoose from "mongoose";

const connectDb = async () => {
  try {
    console.log("MONGO_URL =", process.env.MONGO_URL);

    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB Connected Successfully 🚀");
  } catch (error) {
    console.log("DB ERROR:", error);
    process.exit(1);
  }
};

export default connectDb;