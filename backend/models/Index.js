import mongoose from "mongoose";

const indexSchema = new mongoose.Schema({
  term: {
    type: String,
    unique: true,
  },
  documents: [
    {
      docId: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
      count: Number,
    },
  ],
});

export default mongoose.model("Index", indexSchema);
