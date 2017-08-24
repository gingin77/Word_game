const express = require('express');
const mustacheExpress = require('mustache-express');
// const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');


const app = express();
const port = 3000;
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
let randomWord = words[Math.floor(Math.random() * words.length)];
let wordLength = ""
// const test = "Hi, you've written a variable to your route page."


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
});

app.post('/', function(req,res){
  
})

// Store the word the user is trying to guess in a session. - DONE
//
// On the page, show the number of letters in the word like so:
//
// _ _ _ _ _ _ _ I have something that serves this purpose for now.
//
// Ask the user to supply one guess (i.e. letter) at a time, using a form. This form should be validated to make sure only 1 letter is sent. This letter can be upper or lower case and it should not matter. If a user enters more than one letter, tell them the input is invalid and let them try again.
//
// Let the user know if their guess appears in the computer's word. You will have to store the user's guesses in the session.
//
// Display the partially guessed word, as well as letters that have not been guessed. For example, if the word is BOMBARD and the letters guessed are a, b, and d, the screen should display:
//
// B _ _ B A _ D
//
// A user is allowed 8 guesses. Remind the user of how many guesses they have left after each round. The guesses they have left will be determined by what you have in the session.
//
// A user loses a guess only when they guess incorrectly. If they guess a letter that is in the computer's word, they do not lose a guess.
//
// If the user guesses the same letter twice, do not take away a guess. Instead, display a message letting them know they've already guessed that letter and ask them to try again.
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
