import express from "express";
import cors from "cors";

import { getCurrentDate } from "./util/date.js";
import logger from "./util/logger.js";

import aboutRouter from "./route/about.js";

const app = express();
const PORT = 3001;

app.use(express.json());

// CORS configuration:
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/character", aboutRouter);

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT} at ${getCurrentDate()}`);
});
