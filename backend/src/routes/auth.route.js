import express from "express"
import { getCurrentUser } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// /api/auth/check
router.get("/check", protectRoute, getCurrentUser);

export default router;