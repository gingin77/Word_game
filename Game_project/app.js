const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const session = require('express-session')
const expressValidator = require('express-validator')
const validator = require('validator')

const compare1 = require('./letterCompare.js')
const gameover = require('./gameoverLoop.js')
const randomWordMod = require('./randomWord.js')

const app = express()
app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', './views')

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(expressValidator())
app.use(session({
  secret: 'keyboard pitbull',
  resave: false,
  saveUninitialized: true,
}))

let theWordArray = []
let letterGuess = ''
let resultArray = []
let letterGuessSess = []
let maxEightLettersArray = []
let winArray = []
let duplicateLetter = false
let letterError = false

app.get('/', function(req, res) {
  if (req.session.finish === "loose") {
    gameover.gameoverLoop(theWordArray, resultArray)
      res.render('gameover', {
        resultString: resultArray.join(' '),
        letters_guessed_already: maxEightLettersArray.join(', ')
      })
  }
  if (req.session.finish === "win") {
    res.render('win', {
      resultString: resultArray.join(' '),
      letters_guessed_already: maxEightLettersArray.join(', ')
    })
// the conditional below is what happens after all guesses through out the game before win or loose gets set.
  } else if (req.session.views && req.session.finish !== "loose" || req.session.finish === "win") {
    visitCount = req.session.views++
    req.session.guesses = 8 - maxEightLettersArray.length
    res.render('index', {
      resultString: resultArray.join(' '),
      errorMessage: letterError,
      number_of_guesses_left: req.session.guesses,
      letters_guessed_already: maxEightLettersArray.join(', ')
    })
// the conditional below is what needs to happen at the start of every new game.
  } else if (req.session.finish !== "loose" || req.session.finish === "win") {
    req.session.views = 1
    req.session.guesses = 8 /*assigned for the first time here*/
    req.session.randomWord = randomWordMod.randomWordSelector()
    let string = "_"
    let resultString = string.repeat(req.session.randomWord.length)
    resultArray = req.session.resultDisplay = [...resultString]
    theWordArray = [...req.session.randomWord]
    console.log(req.session)
    res.render('index', {
      resultString: req.session.resultDisplay.join(' '),
      number_of_guesses_left: req.session.guesses
    })
  }
})

app.post('/', function(req, res) {
  duplicateLetter = false
  letterError = false

  let keyInput = req.body.keyInput

  if (validator.isAlpha(req.body.keyInput) && validator.isLength(req.body.keyInput, {min: 1, max: 1})){
    validKeyInput = true
    duplicateLetter = letterGuessSess.includes(keyInput)

    if (duplicateLetter === false) {
      if (letterGuessSess.indexOf(keyInput) === -1) {
        letterGuess = req.body.keyInput
        letterGuessSess.push(letterGuess)
        req.session.letterGuess = letterGuessSess
        compare1.compareLetterToWord(letterGuess, theWordArray, resultArray, maxEightLettersArray, winArray)
      }
      if (winArray.length === resultArray.length) {
        req.session.finish = "win"
      }
      if (maxEightLettersArray.length === 8) {
        req.session.finish = "loose"
      }
      res.redirect('/')
    }else{
      letterError = true
      res.redirect('/')
    }

// here is where the keyInput messages need to send a message to the user...
    } else {
        letterError = true
        res.redirect('/')
    }
})

app.post('/newgame', function(req, res) {
  console.log(req.body.restart)
  console.log("the post function for restart was triggered")
  maxEightLettersArray = []
  winArray = []
  letterGuessSess = []
  req.session.destroy()
  console.log(req.session)
  res.redirect('/')
})

app.listen(3000, function() {
  console.log('Successfully started express application!');
})
