import express from "express";
import { updateProfile } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/update", authMiddleware, updateProfile);

export default router;
