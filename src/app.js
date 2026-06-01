import express from "express";
import dotenv from "dotenv";    
import cors from "cors";
import connectDb from "./config/db.js";
import authRoutes from "./routes/auth-route.js";
import todoRoutes from "./routes/toDo-route.js";
import cookieParser from "cookie-parser";



dotenv.config();

const app=express();

app.use(
  cors({
    origin: "https://asn-task-flow.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

await connectDb();

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.get("/",(req,res)=>{
    res.send("Backing is running succesfully 🚀")

});  

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is running on the port ${PORT} 🚀`)
});