var express = require("express");
var app = express();
var path = require("path");
var http = require('http');
var sanitize = require('validator')
var modules = require('')//should be a full filepath
var db = mysql.createPool({
  connectionLimit: 50,
  host: "localhost",
  user: "root",
  password: "Hx$_yab@i#3ZM2^1_G=t!6eXT",
  database: "web_app_final"
}); //makes use of auto timeout native to the package
//app.use(express.static('use absolute path for testing'));
//lots of things commented out because it's 2AM and I can't be bothered to go double checking form names
app.use(express.static('C:/Users/Wes/Desktop/DEC5thcomit')); //full file path again
app.get('/', function(req, res) {
  //another absolute path for path.join(''));
  res.sendFile(path.join(''));  //full file path again
});
app.get('/beer', function(req, res) {
  functions.getBeersE(function(data) {
    res.send(data);
  })
  //res.sendFile(path.join('C:/Users/Wes/Desktop/Nov29thServerPractice/main.html'));
  res.sendFile(path.join(''));  //full file path again
});
app.post('/login', function(req, res) {
  var password = req.body.psw;
  var name = req.body.uName;
  //sanitize.escape(name);
  //sanitize.escape(password);
  var s = sanitize.blacklist(req.body.unl, '\'<>&""/\\[\\]')
  var p = sanitize.blacklist(req.body.pl, '\'<>&""/\\[\\]')
  var v = test.log(s, p, function(fn) {
    console.log(fn)
    res.sendFile(path.join(''));  //full file path again
    //res.send(fn); //this should just be a file path
  });
});
//the old register method works but its really bad

// app.post('/register', function(req, res){
//   var password = req.body.psw;
//   var username = req.body.Uname;
//   var s = sanitize.blacklist(req.body.unr, '\'<>&""/\\[\\]')
//   var p = sanitize.blacklist(req.body.pr, '\'<>&""/\\[\\]')
//   var kv = functions.hash(password)
//   var pass = kv.hashed
//   var salt = kv.salt
//   registerE(username, 'test@test.test', pass, salt, function( fn ){
//     if (fn == "1062"){
//       res.send("please choose a different username")
//     } else {
//       res.send("account created")
//     }
//   })
// })
app.post('/register', function(req, res) {
  var password = req.body.psw;
  var username = req.body.Uname;
  var s = sanitize.blacklist(req.body.unr, '\'<>&""/\\[\\]')
  var p = sanitize.blacklist(req.body.pr, '\'<>&""/\\[\\]')
  test.isunique(name, 'email', password, function(fn) {
    console.log("duplicates found =", fn);
    if (fn != 0) {
      res.send("choose a different username")
      console.log("choose a different username")
    } else {
      test.createAccount(s, 'email', p)
      res.sendFile(path.join(''));  //full file path again
    };
  });
});
app.post('/review', function(req, res) {
  var beer = req.body.name; //name is the beers Name
  var user = req.body.user; //the current users
  var rating = req.body.score;
  //add sanitizing functions here, it works but is unsafe
  test.review(user, beer, rating); //stored procedure works in workbench but not node
});
app.post('/addBeers', function(req, res){
  name = req.body.name
  type = req.body.type
  description = req.body.description
  price = req.body.price
  l = name.length
  for(var i in l){
    //should really put a delay on this function
    test.addBeers(name[i], type[i], description[i], price[i])
  }
  //test.addBeers(name, type, description, price)
})
app.post('/removeBeer', function(req, res){
  test.offTap(req.body.name)
})
var server = http.createServer(function(req, res) {
  res.end('test');
});
app.listen(3050);
