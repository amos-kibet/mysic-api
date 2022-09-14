import express from "express";

import { signUpController, signInController } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signUpController).post("/signin", signInController);
router.get("/confirm/?:id");
router.post("/signin");

export const authRouter = router;
