import express from "express";

import { signUpController } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signUpController);
router.get("/confirm/?:id");
router.post("/signin");

export const authRouter = router;
