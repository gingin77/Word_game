function compareLetterToWord(letterGuess, theWordArray, resultArray, newResultString){
  console.log("The compareLetterToWord function has been initiated. The randomWord is "+ theWordArray + "And the last guessed letter is ");
  console.log(letterGuess);
  for (let i=0; i<theWordArray.length; i++){
    if (letterGuess === theWordArray[i]){
      resultArray[i] = letterGuess
    }
  }
  // console.log(resultArray)
  // console.log("^^ resultArray");
  // console.log(resultArray.join(" "))
  // console.log('^^resultArray.join(" ")');
  newResultString = resultArray.join(" ")
  console.log(newResultString);
  console.log("^^newResultString");
  console.log("You are on the last line of the compareLetterToWord function");
  return(resultArray, newResultString)
}


module.exports = {
  compareLetterToWord: compareLetterToWord
}
