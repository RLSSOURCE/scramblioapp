/**
 * Count the number of words in a text string
 * @param {string} text - Input text
 * @returns {number} Word count
 */
export const countWords = (text) => {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
};

/**
 * Count the number of characters in a text string
 * @param {string} text - Input text
 * @param {boolean} includeSpaces - Whether to include spaces in the count
 * @returns {number} Character count
 */
export const countCharacters = (text, includeSpaces = true) => {
  if (!text) return 0;
  return includeSpaces ? text.length : text.replace(/\s/g, '').length;
};

/**
 * Count the number of sentences in a text string
 * @param {string} text - Input text
 * @returns {number} Sentence count
 */
export const countSentences = (text) => {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
};

/**
 * Count the number of paragraphs in a text string
 * @param {string} text - Input text
 * @returns {number} Paragraph count
 */
export const countParagraphs = (text) => {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\n+/).filter(p => p.trim().length > 0).length;
};

/**
 * Calculate the average word length
 * @param {string} text - Input text
 * @returns {string} Average word length (formatted to 1 decimal place)
 */
export const calculateAverageWordLength = (text) => {
  const words = countWords(text);
  if (words === 0) return "0.0";
  const charsNoSpaces = countCharacters(text, false);
  return (charsNoSpaces / words).toFixed(1);
};

/**
 * Calculate the average number of words per sentence
 * @param {string} text - Input text
 * @returns {string} Average words per sentence (formatted to 1 decimal place)
 */
export const calculateAverageWordsPerSentence = (text) => {
  const sentences = countSentences(text);
  if (sentences === 0) return "0.0";
  const words = countWords(text);
  return (words / sentences).toFixed(1);
};