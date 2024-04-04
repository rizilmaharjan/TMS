import mongoose from "mongoose";

async function databaseConnection() {
  try {
    await mongoose.connect("mongodb+srv://rizil:helloworld@mern.uguozam.mongodb.net/taskify");
    console.log("connection established successfully");
  } catch (error) {
    console.log(error);
  }
}

export default databaseConnection;
