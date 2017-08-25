function compareLetterToWord(no_match, letterGuess, theWordArray, resultArray, newResultString, maxEightLettersArray, numberGuessesLeft){
  console.log("The letter is "+letterGuess)
  console.log(theWordArray.indexOf(letterGuess))
  console.log("^^theWordArray.indexOf(letterGuess)");


  // if (no_match === true){
    for (let i=0; i<theWordArray.length; i++){
      if (letterGuess === theWordArray[i]){
        resultArray[i] = letterGuess
        // no_match === false
        }
      }
      if (theWordArray.indexOf(letterGuess) === -1){
      console.log("you're inside the 'no_match' part of the compare function");
      maxEightLettersArray.push(letterGuess)
      console.log(maxEightLettersArray)
      console.log("^^maxEightLettersArray" + (maxEightLettersArray.length));
      numberGuessesLeft -= 1
      console.log(numberGuessesLeft);

  }
  newResultString = resultArray.join(" ")
  console.log(newResultString)
  console.log("^^newResultString")
  console.log("You are on the last line of the compareLetterToWord function");
  return(resultArray, newResultString, maxEightLettersArray, numberGuessesLeft)
}

module.exports = {
  compareLetterToWord: compareLetterToWord
}


// (letterGuess !== theWordArray[i])

// console.log("The compareLetterToWord function has been initiated. The randomWord is "+ theWordArray + "And the last guessed letter is ");


// console.log(resultArray)
// console.log("^^ resultArray");
// console.log(resultArray.join(" "))
// console.log('^^resultArray.join(" ")');
