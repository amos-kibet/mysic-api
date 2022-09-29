import { logger } from "../../utils/logger.js";
import { dropDB } from "../queries.js";

(() => {
  require("../../config/db.config.init").query(dropDB, (err, _) => {
    if (err) {
      logger.error(err.message);
      return;
    }
    logger.info("DB Dropped!");
    process.exit(0);
  });
})();
