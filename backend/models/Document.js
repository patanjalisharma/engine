import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tokens: [String],
    url: String,
    link: String,
    redditLink: String,
}, { timestamps: true });

export default mongoose.model("Document", documentSchema);