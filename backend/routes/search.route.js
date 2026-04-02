import express from "express";

import { search } from "../controllers/document.controller.js";

const router = express.Router();

router.get("/", search);


export default router;
