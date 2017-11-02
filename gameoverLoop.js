function gameoverLoop(theWordArray, resultArray){
  console.log(theWordArray)
  console.log(resultArray)
  for (let i=0; i < theWordArray.length; i++) {
    if (resultArray[i] !== theWordArray[i]){
      let missedLetter = theWordArray[i]
      // console.log(missedLetter)
      // console.log(typeof missedLetter)
      resultArray[i] = `<span class="missed">${missedLetter}</span>`
    }
  }
  // console.log(resultArray)
  gameoverLoop2(theWordArray, resultArray)
  function gameoverLoop2(theWordArray, resultArray){
    for (let i=0; i < theWordArray.length; i++){
      if (resultArray[i] === theWordArray[i]) {
        let correctLetter = theWordArray[i]
        resultArray[i] = `<span class="correct">${correctLetter}</span>`
      }
    }
  }
  console.log(resultArray)
  console.log("^^resultArray from inside the gameoverLoopFunction");
  return resultArray

}


module.exports = { gameoverLoop: gameoverLoop }
