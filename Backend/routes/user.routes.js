import express from "express";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();
import { getUsersForSidebar } from "../controllers/user.controller.js";

// unauthenticated users will not be able to access the sidebar.
router.get("/", protectRoute, getUsersForSidebar);

export default router;
