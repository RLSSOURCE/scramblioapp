/**
 * Utility functions for the Wordle Solver feature.
 */

/**
 * Filters words matching green letters in their exact positions.
 * @param {Array<string>} words - List of candidate 5-letter words
 * @param {Array<string|null>} greenLetters - Array of 5 elements, e.g., ['A', null, 'P', null, null]
 * @returns {Array<string>} Filtered words
 */
export const filterWordsByGreen = (words, greenLetters) => {
  return words.filter(word => {
    if (word.length !== 5) return false;
    for (let i = 0; i < 5; i++) {
      const greenChar = greenLetters[i];
      if (greenChar && greenChar.trim() !== '') {
        if (word[i].toUpperCase() !== greenChar.toUpperCase()) {
          return false;
        }
      }
    }
    return true;
  });
};

/**
 * Filters words containing all yellow letters but NOT in their tried positions.
 * @param {Array<string>} words - Candidate words
 * @param {Array<string>} yellowLetters - Array of characters that must be in the word
 * @param {Object} triedPositions - Map of character to array of 0-indexed positions, e.g., { 'A': [0, 2] }
 * @returns {Array<string>} Filtered words
 */
export const filterWordsByYellow = (words, yellowLetters, triedPositions = {}) => {
  if (!yellowLetters || yellowLetters.length === 0) return words;
  
  return words.filter(word => {
    for (const char of yellowLetters) {
      const c = char.toUpperCase();
      // Must contain the letter
      if (!word.includes(c)) return false;
      
      // Must NOT be in the tried positions for this letter
      const restrictedPositions = triedPositions[c] || [];
      for (const pos of restrictedPositions) {
        if (word[pos].toUpperCase() === c) return false;
      }
    }
    return true;
  });
};

/**
 * Excludes words containing any gray letters.
 * @param {Array<string>} words - Candidate words
 * @param {Array<string>} grayLetters - Letters that must not appear in the word
 * @returns {Array<string>} Filtered words
 */
export const filterWordsByGray = (words, grayLetters) => {
  if (!grayLetters || grayLetters.length === 0) return words;
  
  return words.filter(word => {
    for (const char of grayLetters) {
      const c = char.toUpperCase();
      if (word.includes(c)) return false;
    }
    return true;
  });
};

/**
 * Combines all filters and returns sorted results.
 * @param {Array<string|null>} greenLetters - 5 elements array
 * @param {string} yellowString - Space or comma separated letters
 * @param {string} grayString - Space or comma separated letters
 * @param {Set<string>} dictionarySet - Full dictionary set
 * @param {Set<string>} commonWordsSet - Subset of common English words
 * @returns {Array<string>}
 */
export const solveWordle = (greenLetters, yellowString, grayString, dictionarySet, commonWordsSet) => {
  if (!dictionarySet) return [];

  // Parse inputs
  const yellowLetters = [...new Set(yellowString.toUpperCase().replace(/[^A-Z]/g, '').split(''))];
  const grayLetters = [...new Set(grayString.toUpperCase().replace(/[^A-Z]/g, '').split(''))];

  // Start with all 5-letter words
  let candidates = Array.from(dictionarySet).filter(w => w.length === 5);

  // Apply filters
  candidates = filterWordsByGreen(candidates, greenLetters);
  candidates = filterWordsByYellow(candidates, yellowLetters, {}); 
  candidates = filterWordsByGray(candidates, grayLetters);

  // Sort: Common words first, then A-Z
  candidates.sort((a, b) => {
    const aIsCommon = commonWordsSet?.has(a) ? 1 : 0;
    const bIsCommon = commonWordsSet?.has(b) ? 1 : 0;
    
    if (aIsCommon !== bIsCommon) {
      return bIsCommon - aIsCommon; // Common words bubble up (1 before 0)
    }
    return a.localeCompare(b);
  });

  return candidates;
};