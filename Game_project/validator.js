const keyInput = require(req.body.keyInput)

if (validator.isAlpha(req.body.keyInput)){
  console.log("Wonderful!!!!! You entered an alphabet key!")
}else{

}


// req.checkBody({
//  'alhpa': {
//     optional: {
//       options: { checkFalsy: true } // or: [{ checkFalsy: true }]
//     },
//     isEmail: {
//       errorMessage: 'Invalid key'
//     }
//   },
//   'keyInputLength': { //
//     optional: true, // won't validate if field is empty
//     isLength: {
//       options: [{ min: 1, max: 1 }],
//       errorMessage: 'Must enter 1 character' // Error message for the validator, takes precedent over parameter message
//     },
//     errorMessage: 'Too many letters'
//   }
// });


req.checkBody("user", "You must enter a username!").notEmpty();

var errors = req.validationErrors();
if (errors) {
  // Render validation error messages
  var html = errors;
  res.send(html);
} else {
  var user = req.body.user;
  var html = '<p>Your user name is: </p>' + user;
  res.send(html);
