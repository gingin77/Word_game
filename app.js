const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
// const session = require('express-session')
const cookieSession = require('cookie-session')
const expressValidator = require('express-validator')
const validator = require('validator')

const compare1 = require('./letterCompare.js')
const gameover = require('./gameoverLoop.js')
const randomWordMod = require('./randomWord.js')

const app = express()
app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', './views')

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(expressValidator())
app.use(cookieSession({
  name: 'session',
  keys: ['keyboard pitbull'],
  maxAge: 24 * 60 * 60 * 1000
}))

let randomWord = ''
let theWordArray = []
let letterGuess = ''
let resultArray = []
let letterGuessSess = []
let loseArray = []
let winArray = []
let duplicateLetter = false
let letterError = false

app.get('/', function (req, res) {
  if (req.session.finish === 'lose') {
    console.log('lose')
    gameover.gameoverLoop(theWordArray, resultArray)
    res.render('gameover', {
      resultString: resultArray.join(' '),
      letters_guessed_already: loseArray.join(', ')
    })
  }
  if (req.session.finish === 'win') {
    console.log('win')
    res.render('win', {
      resultString: resultArray.join(' '),
      letters_guessed_already: loseArray.join(', ')
    })
  } else if (req.session.finish !== 'lose' || req.session.finish === 'win') {
    if (req.session.views) {
      // req.session = null
      console.log('views')
      req.session.views++
        req.session.guesses = 8 - loseArray.length
      res.render('index', {
        resultString: resultArray.join(' '),
        errorMessage: letterError,
        number_of_guesses_left: req.session.guesses,
        letters_guessed_already: loseArray.join(', ')
      })
    } else {
      console.log('no views')
      req.session.views = 1
      req.session.guesses = 8
      req.session.randomWord = randomWordMod.randomWordSelector().replace(/"/g,"")
      console.log(req.session.randomWord)
      let string = '_'
      let resultString = string.repeat(req.session.randomWord.length)
      resultArray = req.session.resultDisplay = [...resultString]
      theWordArray = [...req.session.randomWord]
      console.log(req.session)
      res.render('index', {
        resultString: req.session.resultDisplay.join(' '),
        number_of_guesses_left: req.session.guesses
      })
    }
  }
})

app.post('/', function(req, res) {
  duplicateLetter = false
  letterError = false

  let keyInput = req.body.keyInput

  if (validator.isAlpha(req.body.keyInput) && validator.isLength(req.body.keyInput, {
      min: 1,
      max: 1
    })) {
    duplicateLetter = letterGuessSess.includes(keyInput)

    if (duplicateLetter === false) {
      if (letterGuessSess.indexOf(keyInput) === -1) {
        letterGuess = req.body.keyInput
        letterGuessSess.push(letterGuess)
        req.session.letterGuess = letterGuessSess

        compare1.compareLetterToWord(letterGuess, theWordArray, resultArray, loseArray, winArray)
      }
      if (winArray.length === resultArray.length) {
        req.session.finish = 'win'
      }
      if (loseArray.length === 8) {
        req.session.finish = 'lose'
      }
      res.redirect('/')
    } else {
      letterError = true
      res.redirect('/')
    }
  } else {
    letterError = true
    res.redirect('/')
  }
})

app.post('/newgame', function(req, res) {
  console.log(req.session)
  req.session = null
  letterGuessSess = []
  loseArray = []
  winArray = []
  res.redirect('/')
})

app.listen(process.env.PORT || 3000, function() {
  console.log('Express server listening on port %d in %s mode', this.address().port, app.settings.env)
})
