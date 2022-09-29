import express from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";

import validateEmail from "../middleware/validateEmail.js";
import { signup, signin } from "../validators/auth.js";

import * as authController from "../controller/user.js";

const router = express.Router();

router.post(
  "/signup",
  signup,
  asyncHandler(validateEmail),
  asyncHandler(authController.signup)
);
router.post("/signin", signin, asyncHandler(authController.signin));

export default router;
