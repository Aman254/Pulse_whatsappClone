import mongoose, { mongo } from "mongoose";
import app from "./app.js";
import logger from "./configs/logger.config.js";

//env variables
const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 8000;

//exit on mongodb error
mongoose.connection.on("error", (err) => {
  logger.error(`Mongodb connection Error: ${err}`);
  process.exit(1);
});

// mongodb debug mode
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}
// mongodb Connection
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to Mogodb");
  });
let server;
server = app.listen(PORT, () => {
  logger.info(`Server is listening at ${PORT}.`);
  // console.log("process id", process.pid);
});
//handle server errors

const exitHandler = () => {
  if (server) {
    logger.info("Server Closed");
    process.exit(1);
  } else {
    process.exit(1);
  }
};
const unexpextedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("UncaughtException", unexpextedErrorHandler);

//SIGTERM
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server Closed");
    process.exit(1);
  } else {
    process.exit(1);
  }
});
