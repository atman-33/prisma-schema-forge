/**
 * Removes a specified suffix from a given string if it exists.
 * @param text - The source string.
 * @param suffix - The suffix to remove.
 * @returns The string with the suffix removed if it existed, otherwise the original string.
 */
const removeSuffix = (text: string, suffix: string): string => {
  if (!suffix) {
    return text;
  }
  console.log(suffix);
  console.log(-suffix.length);
  return text.endsWith(suffix) ? text.slice(0, -suffix.length) : text;
};

export { removeSuffix };
