const fs = require('fs')
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n")

function randomWordSelector(){
  let randomWord = words[Math.floor(Math.random() * words.length)]
  return(randomWord)
}

module.exports = {
  randomWordSelector: randomWordSelector
}
