/**
 * Utility functions for Word Finder by Letters feature.
 */

// Gets character counts for a word
export const getLetterFrequency = (word) => {
  const freq = {};
  for (const char of word.toUpperCase()) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
};

// Checks if a word is a palindrome
export const isPalindrome = (word) => {
  if (!word || word.length < 2) return false;
  const clean = word.toUpperCase().replace(/[^A-Z]/g, '');
  return clean === clean.split('').reverse().join('');
};

// Computes anagrams for a word against the dictionary
export const computeAnagrams = (word, dictionarySet) => {
  const targetSorted = word.toUpperCase().split('').sort().join('');
  const anagrams = [];
  
  for (const dictWord of dictionarySet) {
    if (dictWord.length !== word.length || dictWord === word.toUpperCase()) continue;
    if (dictWord.split('').sort().join('') === targetSorted) {
      anagrams.push(dictWord);
    }
  }
  return anagrams;
};

// Groups array of words by their length, sorted longest first
export const groupByLength = (words) => {
  const grouped = words.reduce((acc, word) => {
    const len = word.length;
    if (!acc[len]) acc[len] = [];
    acc[len].push(word);
    return acc;
  }, {});

  // Convert to array of objects, sorted descending by length
  return Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a)
    .map(length => ({
      length,
      words: grouped[length].sort() // Sort alphabetically within length
    }));
};

/**
 * Scans the dictionary to find all valid words that can be assembled using the available letters.
 * Fully supports exact character quantity matching and '?' wildcards.
 */
export const filterWordsByLetters = (availableLetters, dictSet) => {
  if (!availableLetters || availableLetters.trim() === '') {
    return Array.from(dictSet);
  }

  const available = availableLetters.toUpperCase();
  const blanksCount = (available.match(/\?/g) || []).length;
  const letterCounts = getLetterFrequency(available.replace(/\?/g, ''));
  const maxPossibleLength = available.length;

  return Array.from(dictSet).filter(word => {
    // Optimization & Correctness limit: word cannot be longer than the letters provided
    if (word.length > maxPossibleLength) return false;

    const wordCounts = getLetterFrequency(word);
    let neededBlanks = 0;

    for (const [char, count] of Object.entries(wordCounts)) {
      const availableCount = letterCounts[char] || 0;
      if (count > availableCount) {
        neededBlanks += (count - availableCount);
      }
    }
    
    // A word is valid if the deficit in required characters can be covered by available '?' blanks.
    return neededBlanks <= blanksCount;
  });
};

/**
 * Applies all advanced filters to the candidate words seamlessly.
 */
export const applyFilters = (words, filters, commonWordsSet) => {
  const { startsWith, endsWith, mustContain, excludeLetters, length, commonOnly } = filters;

  return words.filter(word => {
    const w = word.toUpperCase();
    
    if (startsWith && !w.startsWith(startsWith.toUpperCase())) return false;
    if (endsWith && !w.endsWith(endsWith.toUpperCase())) return false;
    if (mustContain && !w.includes(mustContain.toUpperCase())) return false;
    
    if (excludeLetters) {
      const exclude = excludeLetters.toUpperCase().split('');
      if (exclude.some(char => w.includes(char))) return false;
    }
    
    if (length && length !== 'Any' && w.length !== parseInt(length)) return false;
    if (commonOnly && commonWordsSet && !commonWordsSet.has(w)) return false;
    
    return true;
  });
};