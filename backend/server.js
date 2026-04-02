import express from "express";
import dotenv from "dotenv";
import documentRoutes from './routes/document.route.js'
import searchRoutes from './routes/search.route.js'
import crawlRoutes from './routes/crawler.route.js'
import redditRoutes from './routes/reddit.route.js'
import { connectDb } from "./config/db.js";
import cors from 'cors';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://engine-five.vercel.app"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use("/api/document", documentRoutes)
app.use("/api/search", searchRoutes)
app.use("/api/crawl", crawlRoutes)
app.use("/api/reddit", redditRoutes)

app.get("/health", (req, res) => {
  res.json({
    message: "Server is healthy",
  });
});

import mongoose from "mongoose";
import Document from "./models/Document.js";

app.get("/doc/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const doc = await Document.findById(id);

    // ✅ handle not found
    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
app.listen(port, () => {
  connectDb();
  console.log(`Server is running on ${port}`);
});
