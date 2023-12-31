require("dotenv").config();
require("express-async-errors");
const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const swagger = require("swagger-ui-express");
const yaml = require("yamljs");

const connectDB = require("./db/connect");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");

const app = express();
const port = process.env.PORT || 5000;
const swaggerDocs = yaml.load("./swagger.yaml");

app.use(helmet());
app.use(xss());
app.use(cors());
app.use(mongoSanitize());

app.use(express.json());
app.use(express.static("./public"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api-docs", swagger.serve, swagger.setup(swaggerDocs));

app.use(notFound);
app.use(errorHandler);

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
