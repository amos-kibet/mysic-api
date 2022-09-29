import winston from "winston";
const timestamp = new Date(Date.now()).toLocaleString("en-us", {
  timeZone: "Africa/Nairobi",
});
const customFormat = winston.format.combine(
  winston.format.printf((info) => {
    return `${timestamp} [${info.level.toUpperCase().padEnd(0)}]: ${
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
    new winston.transports.File({
      filename: "./logs/info.log",
      level: "info",
    }),
  ],
});

// import winston from "winston";
// // import fs from "fs";
// // import path from "path";
// import dotenv from "dotenv";
// dotenv.config();

// const levels = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   debug: 4,
// };

// const colors = {
//   error: "red",
//   warn: "yellow",
//   info: "green",
//   http: "magenta",
//   debug: "orange",
// };

// winston.addColors(colors);

// const transports = [
//   new winston.transports.File({
//     filename: "./logs/errors.log",
//     level: "error",
//   }),
//   new winston.transports.File({
//     filename: "./logs/combined.log",
//   }),
//   new winston.transports.Http({
//     filename: "./logs/http_logs.log",
//     level: "warn",
//   }),
//   // new winston.transport.Console({
//   //   filename: "./logs/info.log",
//   //   level: "info",
//   // }),
// ];

// export const logger = winston.createLogger({
//   // level: "info",
//   levels,
//   format: winston.format.json(),
//   transports,
// });

// if (process.env.NODE_ENV !== "production") {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.simple()
//       ),
//     })
//   );
// }

// // export const httpLogStream = fs.createWriteStream(
// //   path.join(__dirname, "../", "logs", "http_logs.log")
// // );
