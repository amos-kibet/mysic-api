import { logger } from "../../utils/logger.js";
import { createDB } from "../queries.js";

(() => {
  require("../../config/db.config.init").query(createDB, (err, _) => {
    if (err) {
      logger.error(err.message);
      return;
    }
    logger.info("DB created!");
    process.exit(0);
  });
})();
