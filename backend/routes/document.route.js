import express from "express";

import {
  addDocument,
  getDocuments,
} from "../controllers/document.controller.js";

const router = express.Router();

router.post("/add", addDocument);
router.get("/all", getDocuments);

export default router;
