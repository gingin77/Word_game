// const fs = require('fs')
// const words = fs.readFileSync('/usr/share/dict/words', 'utf-8').toLowerCase().split('\n')

const words = ['endless', 'myriad', 'uncounted', 'untold', 'bags', 'gobs', 'heap', 'immeasurable', 'incalculable', 'infinite', 'innumerous', 'jillion', 'legion', 'limitless', 'loads', 'many', 'measureless', 'mess', 'mint', 'mucho', 'multitudinous', 'numberless', 'oodles', 'passel', 'peck', 'pile', 'raft', 'scads', 'slew', 'stack', 'tidy sum', 'umpteen', 'uncountable', 'wad', 'whole', 'slew', 'zillion']

function randomWordSelector () {
  let randomWord = words[Math.floor(Math.random() * words.length)]
  return (randomWord)
}

module.exports = {
  randomWordSelector: randomWordSelector
}
