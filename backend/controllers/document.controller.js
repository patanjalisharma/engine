import Document from "../models/Document.js";
import { addToIndex } from "../services/indexing.service.js";
import { searchDocuments } from "../services/search.service.js";
import { textProcessor } from "../utils/textProcessor.js";

export async function addDocument(req, res) {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const tokens = textProcessor(content)
    const doc = await Document.create({
      title,
      content,
      tokens,
    });

    await addToIndex(doc._id, tokens)

    return res.status(201).json({ message: "Document created", document: doc });
  } catch (error) {
    console.log(`Error in adding the document: `, error)
    res.status(500).json({ error: error.message });
  }
}


export async function getDocuments(req, res) {
    try {
        const docs = await Document.find().sort({createdAt: -1});
        return res.status(200).json({ documents: docs });
    } catch (error) {
        console.log(`Error in fetching documents: `, error)
        res.status(500).json({ error: error.message });
    }

}

export async function search(req, res) {
  try {
    const {q} = req.query;
    if (!q) {
      return res.status(400).json({ message: "Query is required" });
    }

    const result  = await searchDocuments(q)
    return res.json({result})
  } catch (error) {
    console.error("Search error:", error);
    return systemsres.status(500).json({ error: error.message });
  }
}