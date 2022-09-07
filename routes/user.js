import express from "express";
const router = express.Router();

router.post("/signup");
router.get("/confirm/?:id");
router.post("/signin");

export const authRouter = router;
