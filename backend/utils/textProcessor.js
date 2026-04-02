export function textProcessor(text) {
  //lowercase
  text = text.toLowerCase();

  //removepunctuation
  text = text.replace(/[^\w\s]/g, "");

  //tokenize
  let words = text.split(/\s+/);

  //  stopwords
  const stopWords = new Set([
    "is",
    "and",
    "the",
    "a",
    "an",
    "to",
    "of",
    "in",
    "for",
    "on",
  ]);

  words = words.filter(word =>
  !stopWords.has(word) &&
  word.length > 2 &&
  word.length < 20 &&     // remove weird long junk
  /^[a-z]+$/.test(word)   // only valid words
);

const MAX_TOKENS = 500;

return words.slice(0, MAX_TOKENS);

}
