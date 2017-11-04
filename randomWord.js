const fs = require('fs')
const words = fs.readFileSync('./wordsforwordgame.txt', 'utf-8').toLowerCase().split(',')

function randomWordSelector (req, res) {
  // req.session = null
  let randomWord = words[Math.floor(Math.random() * words.length)]
  console.log(randomWord + 'from randomWord.js')
  console.log(req.session)

  req.session.randomWord = randomWord
}

module.exports = {
  randomWordSelector: randomWordSelector
}
