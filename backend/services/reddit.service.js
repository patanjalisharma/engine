import {textProcessor} from "../utils/textProcessor.js";
import  Document  from "../models/Document.js";
import { addToIndex } from "./indexing.service.js";
import axios from "axios";

export async function fetchRedditPosts(subreddit = "programming") {
    try {
        const url = `https://www.reddit.com/r/${subreddit}.json`;

    const { data } = await axios.get(url, {
  headers: {
    "User-Agent": "mini-search-engine/1.0 (learning project)"
  },
});

if (!data || !data.data || !data.data.children) {
  throw new Error("Invalid Reddit response (possibly blocked)");
}

    const posts = data.data.children;

    const results = [];

    for (let post of posts) {
      const postData = post.data;

      const title = postData.title;
      const content = postData.selftext?.trim() ? postData.selftext : title; // Use title if selftext is empty

      const link = postData.url || null
      const redditLink = `https://www.reddit.com${postData.permalink}`;

      const tokens = textProcessor(content);

      const doc = await Document.create({
        title,
        content,
        tokens,
        link,
        redditLink,
      });

      await addToIndex(doc._id, tokens);

      results.push(doc);
    }

    return results;
    } catch (error) {
        console.error("Error fetching Reddit posts:", error.message);
        throw error;
    }
}