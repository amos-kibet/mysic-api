import { logger } from "../../utils/logger.js";
import { createTableUsers } from "../queries.js";

export const tablesUp = () => {
  require("../../config/db.config").query(createTableUsers, (err, _) => {
    if (err) {
      logger.error(err.message);
      return;
    }
    logger.info("Table users created!");
    process.exit(0);
  });
};
