import { crawlAndIndex } from "../services/crawler.service.js";

export async function crawl(req, res) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        message: "URL is required",
      });
    }
    const doc = await crawlAndIndex(url);

    return res.json({
      message: "Page crawled and indexed",
      document: doc,
    });
  } catch (error) {
    console.error("Error crawling and indexing:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
