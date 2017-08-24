const express = require('express');
const mustacheExpress = require('mustache-express');
// const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');


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

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'keyboard pitbull',
  resave: false,
  saveUninitialized: true,
  // word: "magic",
  // << putting a word key:value pair here doesn't store the word. Usee req.session.word... or something similar
  // cookie: { maxAge: 300000 }
}));

app.get('/', function (req,res){
  req.session.randomWord = randomWord;
  console.log(req.session);
  console.log("^^ req.session");
  console.log(req.session.randomWord);
  console.log("^^ req.session.randomWord");
  wordLength = req.session.randomWord.length
  console.log(wordLength);
  let string = " _ "
  let resultString = string.repeat(wordLength)
  res.send(resultString);
  console.log(wordSpread)
  console.log("^^ wordSpread");
});

app.post('/', function(req,res){
  let letterGuess = req.body.letter_guess
  compareLetterToWord(letterGuess, wordSpread)
  console.log(letterGuess)


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
