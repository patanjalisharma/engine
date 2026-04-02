import express from "express";
import { fetchReddit } from "../controllers/reddit.controller.js";

const router = express.Router();

router.get("/", fetchReddit);

export default router;