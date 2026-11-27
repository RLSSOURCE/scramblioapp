import wordList from './wordList';

/**
 * Get character frequency map for a given string
 * @param {string} str - Input string
 * @returns {Object} Frequency map of characters
 */
function getCharFrequency(str) {
  const freq = {};
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}

/**
 * Find all valid English words from scrambled letters using frequency counting
 * @param {string} letters - Input letters to unscramble
 * @returns {Array<Object>} Array of valid words with metadata
 */
export function unscrambleLetters(letters) {
  // Clean and validate input
  const cleanedLetters = letters.trim().toLowerCase().replace(/[^a-z]/g, '');
  
  if (cleanedLetters.length < 3) {
    return [];
  }
  
  // 1. Count the frequency of each letter in the input string
  const inputFreq = getCharFrequency(cleanedLetters);
  const validWords = [];
  
  // 2. For each word in the dictionary, check if it can be formed
  for (let i = 0; i < wordList.length; i++) {
    const word = wordList[i];
    
    // Optimization: Skip if word is longer than available letters or shorter than 3
    if (word.length > cleanedLetters.length || word.length < 3) {
      continue;
    }
    
    let canForm = true;
    const wordFreq = {};
    
    // Check each character in the dictionary word
    for (let j = 0; j < word.length; j++) {
      const char = word[j];
      wordFreq[char] = (wordFreq[char] || 0) + 1;
      
      // If the character is missing or required more times than available, skip
      if (!inputFreq[char] || wordFreq[char] > inputFreq[char]) {
        canForm = false;
        break;
      }
    }
    
    if (canForm) {
      validWords.push({
        word: word,
        length: word.length
      });
    }
  }
  
  // 3. Sort by length (descending) then alphabetically
  validWords.sort((a, b) => {
    if (b.length !== a.length) {
      return b.length - a.length;
    }
    return a.word.localeCompare(b.word);
  });
  
  // Remove duplicates (to be absolutely safe, though wordList shouldn't have them)
  const uniqueWords = Array.from(
    new Map(validWords.map(item => [item.word, item])).values()
  );
  
  return uniqueWords;
}

/**
 * Get statistics about found words
 * @param {Array<Object>} words - Array of word objects
 * @returns {Object} Statistics object
 */
export function getWordStats(words) {
  if (!words || words.length === 0) {
    return {
      total: 0,
      byLength: {},
      longest: null,
      shortest: null
    };
  }
  
  const byLength = words.reduce((acc, { length }) => {
    acc[length] = (acc[length] || 0) + 1;
    return acc;
  }, {});
  
  return {
    total: words.length,
    byLength,
    longest: words[0]?.word || null,
    shortest: words[words.length - 1]?.word || null
  };
}

/**
 * Filter words based on specific criteria (AND logic)
 * @param {Array<Object>} words - Array of word objects to filter
 * @param {Object} filters - Active filter criteria
 * @returns {Array<Object>} Filtered array of word objects
 */
export function filterWords(words, filters) {
  if (!words || words.length === 0) return [];
  if (!filters) return words;

  return words.filter(({ word, length }) => {
    const w = word.toLowerCase();
    
    if (filters.startsWith && !w.startsWith(filters.startsWith.toLowerCase())) {
      return false;
    }
    
    if (filters.endsWith && !w.endsWith(filters.endsWith.toLowerCase())) {
      return false;
    }
    
    if (filters.contains && !w.includes(filters.contains.toLowerCase())) {
      return false;
    }
    
    if (filters.requiredLetter && !w.includes(filters.requiredLetter.toLowerCase())) {
      return false;
    }
    
    if (filters.length) {
      const targetLength = parseInt(filters.length, 10);
      if (!isNaN(targetLength) && length !== targetLength) {
        return false;
      }
    }
    
    return true;
  });
}