// https://www.dictionaryapi.com/products/api-collegiate-dictionary.htm

console.log(randomWord)
let url = ("http://www.dictionaryapi.com/api/v1/references/collegiate/xml/"+randomWord+"?key=05444020-9a80-470a-9797-d288c4d81606")
console.log(url);

app.get('/win', fetchGET, function (req, res){
  function fetchGET() {
    fetch(url)
      .then(function(response) {
        if (response.status !== 200) {
          console.log(response.status);
          return;
        }
        response.json().then(function(data){
          console.log(data);
          res.send(data)
        })
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    })
    next;
  }
  res.send(data)
})


// https://stackoverflow.com/questions/39301227/external-api-calls-with-express-node-js-and-require-module

router.get('/', function(req, res, next) {
  request({
    uri: 'http://www.giantbomb.com/api/search',
    qs: {
      api_key: '123456',
      query: 'World of Warcraft: Legion'
    }
  }).pipe(res);
});

module.exports = router;
