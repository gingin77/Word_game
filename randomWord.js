const fs = require('fs')
const words = fs.readFileSync('./wordsforwordgame.txt', 'utf-8').toLowerCase().split(',')

function randomWordSelector () {
  let randomWord = words[Math.floor(Math.random() * words.length)]
  console.log(randomWord)
  return (randomWord)
}

module.exports = {
  randomWordSelector: randomWordSelector
}
