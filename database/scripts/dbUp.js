import { logger } from "../../utils/logger.js";
import { createDB } from "../queries.js";

export const dbUp = () => {
  dbConnection.query(createDB, (err, _) => {
    if (err) {
      logger.log({ level: "error", message: err.message });
      return;
    }
    logger.log({ level: "info", message: "DB Created" });
    process.exit(0);
  });
};
