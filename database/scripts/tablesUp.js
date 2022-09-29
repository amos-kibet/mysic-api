import { logger } from "../../utils/logger.js";
import { createTableUsers } from "../queries.js";

export const tablesUp = () => {
  dbConnection.query(createTableUsers, (err, _) => {
    if (err) {
      logger.log({ level: "error", message: err.message });
      return;
    }
    logger.log({ level: "info", message: "Table users created!" });
    process.exit(0);
  });
};
