const express = require('express');
const mustacheExpress = require('mustache-express');
// const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const expressValidator = require('express-validator')
const validator = require('validator')


const app = express();
const port = 3000;
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
const randomWord = words[Math.floor(Math.random() * words.length)];
let wordLength = ""
// const test = "Hi, you've written a variable to your route page."
let wordSpread = [...randomWord]
let alphabet = "abcdefghijklmnopqrstuvwxyz"
let alphabetArray = alphabet.split('')
// console.log(alphabet.split(''))
let letterGuess = ""

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', './views')

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
  req.session.randomWord = randomWord;
  console.log(req.session)
  console.log("^^ req.session")
  console.log(req.session.randomWord)
  console.log("^^ req.session.randomWord")
  wordLength = req.session.randomWord.length
  console.log(wordLength)
  let string = " _ "
  let resultString = string.repeat(wordLength)
  // res.send(resultString)
  console.log(wordSpread)
  console.log("^^ wordSpread")

  res.render('index', {resultString: resultString})
});

app.post('/', function(req, res){ /*I want to store the letter entered in an array and in the session....
  Before saving an entry, I want to validate whether that entry is actually a letter. Use .isalpha
   I'll need to define a couple different variables. 1 - the letter just chosen; 2 - all letters guessed; 3 - correct letters; 4 - incorrect letters*/
   console.log("app.post has been activated");
   let keyInput = req.body.keyInput
   console.log(keyInput)

   if (validator.isAlpha(req.body.keyInput) && validator.isLength(req.body.keyInput, {min:1, max: 1}) ) {
     validKeyInput = true
     console.log("if was " + validKeyInput);
   } else {
     validKeyInput = false
     console.log("else plus " + validKeyInput + "please submit a valid alphabet key");
    //  res.send("please submit a valid alphabet key")
     res.redirect('/')
   }


  //  req.checkBody("keyInput", "Enter a letter to play!").notEmpty();

  // let letterGuess = req.body.letter_guess
  // compareLetterToWord(letterGuess, wordSpread)
  // console.log(letterGuess)
  // req.session.letters = letterGuessArray
  // req.session.wrongletters
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
