function compareLetterToWord(letterGuess, theWordArray, resultArray, newResultString, maxEightLettersArray, numberGuessesLeft){
  console.log("The letter is "+letterGuess)
  // console.log(theWordArray.indexOf(letterGuess))
  // console.log("^^theWordArray.indexOf(letterGuess)");

    for (let i=0; i<theWordArray.length; i++){
      if (letterGuess === theWordArray[i]){
        resultArray[i] = letterGuess
        }
      }
    if (theWordArray.indexOf(letterGuess) === -1){
    console.log("you're inside the 'no_match' part of the compare function");
    maxEightLettersArray.push(letterGuess)
    console.log(maxEightLettersArray)
    console.log("^^maxEightLettersArray" + (maxEightLettersArray.length));
    numberGuessesLeft = 8 - (maxEightLettersArray.length);
    console.log(numberGuessesLeft);

  }
  // maxEightLettersArray.push(letterGuess)
  console.log(maxEightLettersArray)
  console.log("^^maxEightLettersArray" + (maxEightLettersArray.length));
  // numberGuessesLeft = 8 - (maxEightLettersArray.length);
  console.log(numberGuessesLeft);
  
  newResultString = resultArray.join(" ")
  // req.session.guesses = numberGuessesLeft
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
