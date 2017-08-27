const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const expressValidator = require('express-validator')
const validator = require('validator')

const compare1 = require('./letterCompare.js')

const app = express();
const port = 3000;

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
const randomWord = words[Math.floor(Math.random() * words.length)];
let wordLength = ""
let theWordArray = [...randomWord]
let no_match = true
let letterGuess = ""
let resultArray = []
// let newResultString = ""
let letterGuessSess = []
let maxEightLettersArray = []
let numberGuessesLeft = ""
let winArray = []

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
  // word: "magic",
  // << putting a word key:value pair here doesn't store the word. Usee req.session.word... or something similar
  // cookie: { maxAge: 300000 } << implement a timeout function later....
}));


app.get('/', function (req,res){
  if (req.session.guesses === 1){
    req.session.finish = "loose"
    res.send('<p> GAME OVER</p>')
  }
  if (req.session.finish === "win") {
    console.log(req.session)
    console.log("^^You win!")
    res.send('<p>You win!!!!</p>')
  }
  else if (req.session.views){
    visitCount = req.session.views++
    console.log(resultArray.join(' '))
    console.log("^^resultArray.join(' ') within the app.get if statment")
    numberGuessesLeft = 8-maxEightLettersArray.length
    console.log(8-maxEightLettersArray.length)
    console.log("^^ 8-maxEightLettersArray.length ")
    req.session.guesses = numberGuessesLeft
    console.log(req.session)
    console.log("^^ req.session within app.get if")

    res.render('index', {resultString: resultArray.join(' '), number_of_guesses_left: numberGuessesLeft, letters_guessed_already: maxEightLettersArray.join(', ')})
  }else{
    req.session.views = 1
    // console.log(guessesLeft)
    req.session.guesses = 8

    // console.log(numberGuessesLeft)
    // console.log("^^ maxEightLettersArray, number_of_guesses_left")

    // console.log(req.session)
    // console.log("^^ req.session within app.get else")
    req.session.randomWord = randomWord
    console.log(req.session.randomWord)
    // console.log("^^ req.session.randomWord within app.get else")
    wordLength = req.session.randomWord.length
    // console.log(wordLength)
    let string = "_"
    let resultString = string.repeat(wordLength)
    resultArray = [...resultString]
    console.log(resultArray.join(' '))
    console.log("^^resultArray.join within app.get else")

    res.render('index', {resultString: resultArray.join(' '), number_of_guesses_left: "8"})
    console.log("end of else option within the app.get function")
  }
});

app.post('/', function(req, res){ /*I want to store the letter entered in an array and in the session....
  Before saving an entry, I want to validate whether that entry is actually a letter. Use .isalpha
   I'll need to define a couple different variables.
     1 - the letter just chosen;
     2 - all letters guessed;
     3 - correct letters;
     4 - incorrect letters*/
   console.log("app.post has been activated")

     req.session.guesses = numberGuessesLeft
     console.log(numberGuessesLeft)
     console.log("numberGuessesLeft")
     console.log(req.session.guesses)
     console.log("^^req.session.guesses")

   let keyInput = req.body.keyInput
   console.log(keyInput)

   if (validator.isAlpha(req.body.keyInput) && validator.isLength(req.body.keyInput, {min:1, max: 1}) ) {
     validKeyInput = true
     console.log("if was " + validKeyInput);

         letterGuess = req.body.keyInput
        //  console.log(letterGuess);
        //  console.log("^^letterGuess");
         letterGuessSess.push(letterGuess)
         req.session.letterGuess = letterGuessSess
        //  console.log(letterGuessSess)
        //  console.log("^^letterGuessSess");
         compare1.compareLetterToWord(letterGuess, theWordArray, resultArray, /*newResultString,*/ maxEightLettersArray, numberGuessesLeft, winArray)
         req.session.guesses = numberGuessesLeft
         console.log( maxEightLettersArray )
         console.log(maxEightLettersArray.length);
         console.log( resultArray )

         if (winArray.length === resultArray.length){
           // res.send("<p> Your word has 8 letters!</p>")
           req.session.finish = "win"
           console.log("^^You win! from the app.post");
           console.log(req.session.finish)
          //  res.send('<p>You win!!!!</p>')
         }

     res.redirect('/')

   } else {
     validKeyInput = false
     console.log("else plus " + validKeyInput + "please submit a valid alphabet key");
    //  res.send("please submit a valid alphabet key")
     res.redirect('/')
   }
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
