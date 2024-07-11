
/**
 * 获取字符串的所有子集字符串。
 * @param str - 要获取子串的字符串。
 * @returns 字符串的所有子集字符串。
 */
export function getAllSubstrings(str: string): string[] {
  const substrings: string[] = [];
  
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      substrings.push(str.slice(i, j));
    }
  }
  
  return substrings;
}

/**
 * 获取两个字符串的公共子串。
 * @param str1 - 第一个字符串。
 * @param str2 - 第二个字符串。
 * @returns 两个字符串的公共子串。
 */
export function getCommonSubstrings(str1: string, str2: string): string[] {
  const commonSubstrings: string[] = [];
  
  for (let i = 0; i < str1.length; i++) {
    for (let j = i + 1; j <= str1.length; j++) {
      const substring = str1.slice(i, j);
      if (str2.includes(substring)) {
        commonSubstrings.push(substring);
      }
    }
  }
  
  return commonSubstrings;
}

/**
 * 获取两个字符串中最长的公共子串。
 * @param str1 - 第一个字符串。
 * @param str2 - 第二个字符串。
 * @returns 两个字符串中最长的公共子串。
 */
export function getLongestCommonSubstring(str1, str2) {
  let longestSubstring = '';
  
  for (let i = 0; i < str1.length; i++) {
    for (let j = i + 1; j <= str1.length; j++) {
      const substring = str1.slice(i, j);
      if (str2.includes(substring) && substring.length > longestSubstring.length) {
        longestSubstring = substring;
      }
    }
  }
  
  return longestSubstring;
}

/**
 * 计算两个字符串的相似度。
 * @param str1 - 第一个字符串。
 * @param str2 - 第二个字符串。
 * @returns 两个字符串的相似度和最长字串。
 */
export function calculateSimilarity(str1: string, str2: string) {
  if(!str1 || !str2) return { similarity: 0, maxChildStr: ''}
  if(str1 === str2) return { similarity: 1, maxChildStr: str1}

  const maxChildStr = getLongestCommonSubstring(str1, str2);
  const result = maxChildStr.length*2 / (str1.length + str2.length)
  return {
    similarity: result,
    maxChildStr
  }
}

/**
 * 获取字符串数组中与给定字符串最相似的字符串。
 * @param strArray - 字符串数组。
 * @param str - 给定的字符串。
 * @param similarity - 相似度阈值，默认为0.1。
 * @returns 最相似的字符串及其相似度。
 */
export function getSimilarStrInStrArray(strArray: string[], str: string, similarity: number = 0.1) {
  let maxSimilarity = 0; // 相似度
  let similarStr = ''; // 最相似的字符串
  let maxSimilarityStr = '' // 最长的公共子串
  for (const item of strArray) {
    if(maxSimilarityStr.length >= item.length ) continue
    const { similarity: sim, maxChildStr } = calculateSimilarity(str, item);
    if (sim >= similarity && sim > maxSimilarity) {
      maxSimilarity = sim;
      similarStr = item;
      maxSimilarityStr = maxChildStr
    }
  }
  return {
    value: similarStr,
    similarity: maxSimilarity
  }
}

export function isSomeArray(arr1: string[], arr2: string[]): boolean {
  const str1 = arr1.join('_')
  const str2 = arr2.join('_')
  return str1 === str2
}