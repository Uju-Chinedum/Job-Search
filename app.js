require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connect");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
