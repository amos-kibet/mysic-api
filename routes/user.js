import express from "express";
import auth from "../controllers/auth.js";

import { confirmedEmail } from "../utils/email.js";

const router = express.Router();

router.post("/signup", auth.signUpController)
router.post("/signin", auth.signInController);
router.get("/confirm/:id", confirmedEmail)
router.post("/signin");

export const authRouter = router;
