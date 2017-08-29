// This module is not being used by the app.js code right now

function resultDisplay(req, res){
  req.session.randomWord.length = wordLength
  let string = "_"
  let resultString = string.repeat(wordLength)
  let resultArray = [...resultString]
  console.log(resultArray.join(' '))
  console.log("^^resultArray.join at the end of the wordDisplay function")
  return(resultArray)
}

module.exports = {
  resultDisplay: resultDisplay
}
// theWordArray = [...randomWord]




// randomWordcapped =
// function wordCapFunct(){
//   for (let i=0; i<words.length; i++){
//     if (words[i].length < 6){
//       randomWordcapped.push(words[i])
//     }
//   }
// }
// wordCapFunct(words)
// console.log((randomWordcapped.length), (randomWordcapped[2000]));
// console.log(numberGuessesLeft)
// console.log("^^ maxEightLettersArray, number_of_guesses_left")

// function wordCapFunct(){
//   for (let i=0; i<words.length; i++){
//     if (words[i].length < 6){
//       randomWordcapped.push(words[i])
//     }
//   }
// }
// wordCapFunct(words)
// console.log((randomWordcapped.length), (randomWordcapped[2000]));


// console.log(numberGuessesLeft)
// console.log("^^ maxEightLettersArray, number_of_guesses_left")
//
// console.log(req.session)
// console.log("^^ req.session within app.get else")
