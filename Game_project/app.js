const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const session = require('express-session')
const expressValidator = require('express-validator')
const validator = require('validator')

const compare1 = require('./letterCompare.js')
const gameover = require('./gameoverLoop.js')
const randomWordMod = require('./randomWord.js')
// const resultDisplay = require('./wordDisplay.js')

const app = express()
const port = 3000;

let theWordArray = []
let letterGuess = ''
let resultArray = []
let letterGuessSess = []
let maxEightLettersArray = []
let winArray = []
let duplicate_letter = false

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', './views')

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.use(session({
  secret: 'keyboard pitbull',
  resave: false,
  saveUninitialized: true,
}));

app.get('/', function (req,res){
  if (req.session.finish === "loose"){
    console.log(theWordArray)
    console.log(resultArray)
    console.log("game over condition has been activated");
    gameover.gameoverLoop(theWordArray, resultArray)
    // req.session.finish = "loose"
    res.render('gameover', {resultString: resultArray.join(' '), letters_guessed_already: maxEightLettersArray.join(', ')})
    console.log(req.session)
    console.log(theWordArray)
  }
  if (req.session.finish === "win") {
    console.log(req.session)
    // console.log("^^You win!")
    res.render('win', {resultString: resultArray.join(' '), letters_guessed_already: maxEightLettersArray.join(', ')})
  }
  else if (req.session.views && req.session.finish !== "loose" || req.session.finish === "win"){
    visitCount = req.session.views++
    console.log(duplicate_letter + "from inside the app.get else if");
    console.log(resultArray.join(' '))
    console.log("^^resultArray.join(' ') within the app.get if statment")
    req.session.guesses = 3-maxEightLettersArray.length
    // numberGuessesLeft = 3-maxEightLettersArray.length
    console.log(3-maxEightLettersArray.length)
    console.log("^^ 3-maxEightLettersArray.length ")
    // req.session.guesses = numberGuessesLeft
    console.log(req.session)
    console.log("^^ req.session within app.get if")

    res.render('index', {resultString: resultArray.join(' '), number_of_guesses_left: req.session.guesses, letters_guessed_already: maxEightLettersArray.join(', ')})

// the conditional below is what needs to happen at the start of every new game.
  }else if (req.session.finish !== "loose" || req.session.finish === "win"){
    req.session.views = 1
    req.session.guesses = 3 /*assigned for the first time here*/
    req.session.randomWord = randomWordMod.randomWordSelector()
    console.log(req.session)
    console.log(req.session.randomWord)
    console.log(req.session.randomWord.length);
    console.log(typeof req.session.randomWord.length)
    let string = "_"
    let resultString = string.repeat(req.session.randomWord.length)
    resultArray = req.session.resultDisplay = [...resultString]
    theWordArray = [...req.session.randomWord]
    console.log(req.session.resultDisplay.join(' '))
    console.log("^^req.session.resultDisplay.join at the end of the wordDisplay function")
    res.render('index', {resultString: req.session.resultDisplay.join(' '), number_of_guesses_left: req.session.guesses})
    console.log("end of else option within the app.get function")
  }
});

app.post('/', function(req, res){
    console.log("app.post has been activated")
    duplicate_letter = false
    // req.session.guesses = numberGuessesLeft

    let keyInput = req.body.keyInput
    console.log(keyInput)

      if (validator.isAlpha(req.body.keyInput) && validator.isLength(req.body.keyInput, {min:1, max: 1})){
        duplicate_letter = letterGuessSess.includes(keyInput)
        if (duplicate_letter === true) {
         console.log("you've already chosen this letter")
         duplicate_letter = true
         console.log(duplicate_letter);
       }
      }

   if (validator.isAlpha(req.body.keyInput) && validator.isLength(req.body.keyInput, {min:1, max: 1}) && duplicate_letter === false) {
     validKeyInput = true
     console.log("the valid was " + validKeyInput)

      if (letterGuessSess.indexOf(keyInput) === -1){
           letterGuess = req.body.keyInput
           letterGuessSess.push(letterGuess)
           req.session.letterGuess = letterGuessSess
           compare1.compareLetterToWord(letterGuess, theWordArray, resultArray, maxEightLettersArray, winArray)
          //  req.session.guesses = numberGuessesLeft
         }
      if (winArray.length === resultArray.length){
             req.session.finish = "win"
          }
      if (maxEightLettersArray.length === 3){
        req.session.finish = "loose"
        console.log(req.session.finish)
          }
      res.redirect('/')
   } else {
        if (validKeyInput === false){
          console.log("please submit a valid alphabet key");
         //  res.send("please submit a valid alphabet key")
          res.redirect('/')
        }
        if (duplicate_letter === true){
          console.log("The letter has already been guessed once before");
         //  res.send("please submit a valid alphabet key")
          res.redirect('/')
        }
   }
})

// app.get('/newgame', function(req,res){
//   res.send('<p>Was the session destroyed??</p>')
//   console.log(req.session)
// })

app.post('/newgame', function(req,res){
  console.log(req.body.restart)
  // console.log(typeof req.body.restart)
  console.log("the post function for restart was triggered")
  maxEightLettersArray=[]
  winArray=[]
  letterGuessSess=[]
  req.session.destroy()
  console.log(req.session)
  res.redirect('/')
})




// Store the word the user is trying to guess in a session. - DONE
//
// On the page, show the number of letters in the word like so:
//
// _ _ _ _ _ _ _ I have something that serves this purpose for now. However, I think once letters are guessed correctly, this method won't work so well....
//
// Ask the user to supply one guess (i.e. letter) at a time, using a form. This form should be validated to make sure only 1 letter is sent. This letter can be upper or lower case and it should not matter. If a user enters more than one letter, tell them the input is invalid and let them try again. *** In the post request.

//
// The game should end when the user constructs the full word or runs out of guesses. If the player runs out of guesses, reveal the word to the user when the game ends.
//
// When a game ends, ask the user if they want to play again. The game begins again if they reply positively.


app.listen(3000, function () {
  console.log('Successfully started express application!');
})


// Saved here in case it may be useful at some point:
// Rolling
// Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown.

// A vanilla JS alternative to using validator for alphanumeric control - put resrictions on the
