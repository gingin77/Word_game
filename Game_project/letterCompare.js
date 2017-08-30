function compareLetterToWord(letterGuess, theWordArray, resultArray, maxEightLettersArray, winArray)
{
  for (let i = 0; i < theWordArray.length; i++) {
    if (letterGuess === theWordArray[i]) {
      resultArray[i] = letterGuess
      winArray.push(theWordArray[i])
    }
  }
  if (theWordArray.indexOf(letterGuess) === -1) {
    maxEightLettersArray.push(letterGuess)
  }
  return (resultArray, maxEightLettersArray, winArray)
}

module.exports = {
  compareLetterToWord: compareLetterToWord
}
