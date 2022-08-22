const router = require("express").Router();
const { asyncHandler } = require("../middleware/asyncHandler");

const validateEmail = require("../middleware/validateEmail");
const {
  signup: signupValidator,
  signin: signinValidator,
} = require("../validators/auth");

const authController = require("../controller/user");


router.post(
  "/signup",
  signupValidator,
  asyncHandler(validateEmail),
  asyncHandler(authController.signup)
);
router.post("/auth/verify/:id", authController.verifyEmail)
router.post("/signin", signinValidator, asyncHandler(authController.signin));

module.exports = router;
