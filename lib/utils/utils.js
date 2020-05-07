function getNumberOfWords(string) {
  return string.trim().split(/\s+/).length;
}

exports.getNumberOfWords = getNumberOfWords;
