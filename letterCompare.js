function compareLetterToWord (letterGuess, theWordArray, resultArray, loseArray, winArray) {
  for (let i = 0; i < theWordArray.length; i++) {
    if (letterGuess === theWordArray[i]) {
      // let nomatch = false
      resultArray[i] = letterGuess
      winArray.push(theWordArray[i])
    }
  }
  if (theWordArray.indexOf(letterGuess) === -1) {
    loseArray.push(letterGuess)
  }
  return (resultArray, loseArray, winArray)
}

module.exports = {
  compareLetterToWord: compareLetterToWord
}
