import winston from "winston";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const timestamp = new Date(Date.now()).toLocaleString("en-us", {
  timeZone: "Africa/Nairobi",
});
const customFormat = winston.format.combine(
  winston.format.printf((info) => {
    return `${timestamp} [${info.level.toUpperCase().padEnd(7)}]: ${
      info.message
    }`;
  })
);
export const logger = winston.createLogger({
  format: customFormat,
  transports: [
    new winston.transports.File({
      filename: "./logs/errors.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "./logs/info.log", level: "info" }),
  ],
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const httpLogStream = fs.createWriteStream(
  path.join(__dirname, "../", "logs", "http_logs.log")
);
