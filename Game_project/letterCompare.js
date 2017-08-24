// Let the user know if their guess appears in the computer's word. You will have to store the user's guesses in the session.
//
// Display the partially guessed word, as well as letters that have not been guessed. For example, if the word is BOMBARD and the letters guessed are a, b, and d, the screen should display:
//
// B _ _ B A _ D
//
// A user is allowed 8 guesses. Remind the user of how many guesses they have left after each round. The guesses they have left will be determined by what you have in the session. **** Figure out how to restrict the submit button... or can this be controlled with sessions??
//
// A user loses a guess only when they guess incorrectly. If they guess a letter that is in the computer's word, they do not lose a guess.
//
// If the user guesses the same letter twice, do not take away a guess. Instead, display a message letting them know they've already guessed that letter and ask them to try again.

const randomWordSession = require(req.session.randomWord);
