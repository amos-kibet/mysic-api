import winston from "winston";
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
