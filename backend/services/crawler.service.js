import { textProcessor } from "../utils/textProcessor.js";
import axios from "axios";
import * as cheerio from "cheerio";
import Document from "../models/Document.js";
import { addToIndex } from "./indexing.service.js";

export async function crawlAndIndex(url) {
  try {

    const existingDoc = await Document.findOne({  url });
    if(existingDoc) {
      console.log("Document exist")
      return existingDoc;
    }
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(data);

    let title =  $("title").text();
     const content = $("#mw-content-text p").text();

    const MAX_CONTENT_LENGTH = 5000;
    const cleanContent = content.slice(0, MAX_CONTENT_LENGTH);
    const finalContent = content.trim()

    if (!title) {
      title = "Untitled Document";
    }

    const tokens = textProcessor(cleanContent);

    const doc = await Document.create({
      title,
      content: finalContent,
      tokens,
      url,
    });

    await addToIndex(doc._id, tokens);

    return doc;
  } catch (error) {
    console.error("Error crawling and indexing:", error);
  }
}
