// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({path: './env'})


connectDB()

.then(() => {
    app.listen(process.env.PORT || 8000)
    console.log("server is running in port " + process.env.PORT);
})
.catch((err) => {
    console.log("MONGO DB connection failed" , err);
})



/*
import express from "express";
const app = express()(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("errors", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
        console.log(`App is listening on port ${process.env.PORT}`);
    })
  } catch (error) {
    console.log("ERROR: ", error);
    throw error;
  }
})();
*/