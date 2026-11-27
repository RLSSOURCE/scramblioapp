export const cleanText = (text) => {
  if (!text) return '';
  return text.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
};

export const getCleanedVersion = (text) => {
  if (!text) return '';
  return text.replace(/[^A-Za-z0-9]/g, '');
};

export const isPalindrome = (text) => {
  const cleaned = cleanText(text);
  if (!cleaned) return false;
  return cleaned === cleaned.split('').reverse().join('');
};