import express from "express";

import { authController } from "../controller/auth.js";

const router = express.Router();

router.post("/signup", authController);
router.get("/confirm/?:id");
router.post("/signin");

export const authRouter = router;
