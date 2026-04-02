import Index from "../models/Index.js";

export async function addToIndex(docId, tokens) {
    const frequencyMap = {};

    for(let token of tokens) {
        frequencyMap[token] = (frequencyMap[token] || 0) + 1
    }

    for(let term in frequencyMap) {
        const count = frequencyMap[term];

        const existing = await Index.findOne({term})

        if(existing) {
            existing.documents.push({docId, count})
            await existing.save()
        } else {
            await Index.create({
                term,
                documents: [{docId, count}]
            })
        }
    }
}