import express from "express";

import { signUpController, signInController } from "../controllers/auth.js";
import { confirmedEmail } from "../utils/email.js";

const router = express.Router();

router.post("/signup", signUpController).post("/signin", signInController);
router.get("/confirm/:id", confirmedEmail)
router.post("/signin");

export const authRouter = router;
