import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3002;

async function start() {
  try {
   //  await mongoose.connect("адреса підключення до твоєї бази з паролем");
    app.listen(port, () => console.log(`Server listening to port ${port}`));
  } catch (error) {
    console.log(error);
  }
}

start()
