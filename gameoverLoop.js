function gameoverLoop (theWordArray, resultArray) {
  for (let i = 0; i < theWordArray.length; i++) {
    if (resultArray[i] !== theWordArray[i]) {
      let missedLetter = theWordArray[i]
      resultArray[i] = `<span class="missed">${missedLetter}</span>`
    }
  }

  gameoverLoop2(theWordArray, resultArray)
  function gameoverLoop2 (theWordArray, resultArray) {
    for (let i = 0; i < theWordArray.length; i++) {
      if (resultArray[i] === theWordArray[i]) {
        let correctLetter = theWordArray[i]
        resultArray[i] = `<span class="correct">${correctLetter}</span>`
      }
    }
  }
  return resultArray
}

module.exports = { gameoverLoop: gameoverLoop }
