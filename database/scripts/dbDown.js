import { logger } from "../../utils/logger.js";
import { dropDB } from "../queries.js";

export const dbUp = () => {
  dbConnection.query(dropDB, (err, _) => {
    if (err) {
      logger.log({ level: "error", message: err.message });
      return;
    }
    logger.log({ level: "info", message: "DB Dropped!" });
    process.exit(0);
  });
};
