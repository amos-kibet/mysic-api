import { logger } from "../utils/logger.js";

export const asyncHandler = (callback) => async (req, res, next) => {
  try {
    await callback(req, res, next);
  } catch (err) {
    logger.log({ level: "error", message: err.message });
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
  return true;
};

// export default {
//   asyncHandler,
// };
