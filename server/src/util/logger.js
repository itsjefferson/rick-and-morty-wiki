import winston from "winston";
import path from "path";

const logFilePath = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  "../logs/server.log"
);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [new winston.transports.File({ filename: logFilePath })],
});

export default logger;
