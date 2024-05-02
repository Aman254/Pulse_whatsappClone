import express, { json } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";
import routes from "./routes/index.js";

//dotenv config
dotenv.config();

//Create express app
const app = express();

//MORGAN
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//Helmet
app.use(helmet());

//Parse Json request Url
app.use(express.json());

//Parse Json request body
app.use(express.urlencoded({ extended: true }));

//sanatize request Data
app.use(mongoSanitize());

// Enable Cookie Parser
app.use(cookieParser());

//gzip Compression
app.use(compression());

//File Upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
//cors
app.use(cors());

// api v1 routes
app.use("/api/v1/", routes);

app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This Route Does not Exist"));
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
app.get("/", (req, res) => {
  res.send("Hello from server");
});

export default app;
