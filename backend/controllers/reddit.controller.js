import { fetchRedditPosts } from "../services/reddit.service.js";

export async function fetchReddit(req, res) {
  try {
    const { subreddit } = req.query;

    const posts = await fetchRedditPosts(subreddit);

    res.json({
      message: "Reddit posts indexed",
      count: posts.length,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}