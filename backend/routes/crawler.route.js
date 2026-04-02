import express from 'express';
import { crawl } from '../controllers/crawler.controller.js';

const router = express.Router()

router.post("/", crawl)

export default router;