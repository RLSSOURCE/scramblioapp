/**
 * Utility functions for the Crossword Solver feature.
 */

/**
 * Filters words based on a crossword pattern with wildcards (? or _),
 * optional inclusion/exclusion letters, and optional length override.
 * 
 * @param {string} pattern - Pattern string, e.g., "C?T" or "H_LL_"
 * @param {string} mustContainLetters - Letters that must be in the word
 * @param {string} excludeLetters - Letters that must not be in the word
 * @param {string|number} lengthOverride - Specific length required (overrides pattern length if different)
 * @param {Set<string>} dictSet - The dictionary set of words
 * @param {Set<string>} commonSet - The set of common words for sorting
 * @param {boolean} commonFirst - Whether to sort common words to the top
 * @returns {Array<string>} - Sorted array of matching words
 */
export const filterWordsByCrosswordPattern = (
  pattern,
  mustContainLetters = '',
  excludeLetters = '',
  lengthOverride = '',
  dictSet = new Set(),
  commonSet = new Set(),
  commonFirst = false
) => {
  if (!dictSet) return [];

  // Normalize pattern: uppercase and convert underscores to question marks
  let normalizedPattern = (pattern || '').toUpperCase().replace(/_/g, '?');
  
  // Determine target length
  const targetLength = parseInt(lengthOverride, 10) || normalizedPattern.length;
  if (!targetLength) return []; // If no pattern and no length, return empty

  // Adjust pattern to match target length if override is provided
  if (targetLength > normalizedPattern.length) {
    normalizedPattern = normalizedPattern.padEnd(targetLength, '?');
  } else if (targetLength > 0 && targetLength < normalizedPattern.length) {
    normalizedPattern = normalizedPattern.substring(0, targetLength);
  }

  // Build Regex: replace '?' with '.' for single character matching
  const regexStr = '^' + normalizedPattern.replace(/\?/g, '.') + '$';
  const regex = new RegExp(regexStr);

  // Parse filters
  const mustContain = mustContainLetters.toUpperCase().replace(/[^A-Z]/g, '').split('');
  const exclude = excludeLetters.toUpperCase().replace(/[^A-Z]/g, '').split('');

  const results = [];

  // Iterate over dictionary
  for (const word of dictSet) {
    if (word.length !== targetLength) continue;
    if (!regex.test(word)) continue;
    
    // Check must contain
    let hasAll = true;
    for (const char of mustContain) {
      if (!word.includes(char)) {
        hasAll = false;
        break;
      }
    }
    if (!hasAll) continue;

    // Check exclude
    let hasExcluded = false;
    for (const char of exclude) {
      if (word.includes(char)) {
        hasExcluded = true;
        break;
      }
    }
    if (hasExcluded) continue;

    results.push(word);
  }

  // Sort Results
  results.sort((a, b) => {
    if (commonFirst && commonSet) {
      const aCommon = commonSet.has(a) ? 1 : 0;
      const bCommon = commonSet.has(b) ? 1 : 0;
      if (aCommon !== bCommon) {
        return bCommon - aCommon; // 1 (true) comes before 0 (false)
      }
    }
    return a.localeCompare(b);
  });

  return results;
};