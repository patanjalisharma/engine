import Document from "../models/Document.js";
import Index from "../models/Index.js";
import { textProcessor } from "../utils/textProcessor.js";

export async function searchDocuments(query) {
  const tokens = textProcessor(query);

  const docScores = {};

  for (let token of tokens) {
    const indexEntry = await Index.findOne({ term: token });

    if (!indexEntry) continue;
    for (let doc of indexEntry.documents) {
      const docId = doc.docId.toString();

      // score = frequency
      docScores[docId] = (docScores[docId] || 0) + doc.count;
    }
  }
  const sortedDocs = Object.entries(docScores)
    .sort((a, b) => b[1] - a[1])
    .map(([docId]) => docId);

 const docs = await Document.find({ _id: { $in: sortedDocs } });

const orderedResults = sortedDocs.map(id =>
  docs.find(doc => doc._id.toString() === id)
);

return orderedResults;
}
