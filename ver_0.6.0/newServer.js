var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var mysql = require('mysql');
var path = require('path');
var http = require('http');
var https = require('https')
var sanitize = require('validator')
var modules = require(__dirname + '/modules.js')
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
var db = mysql.createPool({
  connectionLimit: 50,
  host: "localhost",
  user: "root",
  password: "Hx$_yab@i#3ZM2^1_G=t!6eXT",
  database: "web_app_final"
}); //makes use of auto timeout native to the package
'C:/Users/Wes/Desktop/ver_0.5.9'
app.use(express.static(__dirname + '/ver_0.5.9'));
app.get('/index', function(req, res) {
  res.sendFile(path.join(__dirname + '/ver_0.5.9/index.html'));
});
app.get('/beer', function(req, res) {
  console.log("/beer", req.body)
  db.getConnection(function(err, connection) {
    modules.getBeersE(function( fn ){
      res.json(fn)
    })
  })
});
app.get('/admin', function(req, res){
    res.sendFile(path.join(__dirname + '/ver_0.5.9/admin.html'))
});
app.post('/log', function (req, res) {
  var pw = req.body.passT;
  var un = req.body.userT;
  console.log(req.body)
  var s = sanitize.blacklist(un, '\'<>&""/\\[\\]()')
  var p = sanitize.blacklist(pw, '\'<>&""/\\[\\]()')
  var v = modules.log(s, p, function(fn){
    console.log(fn)
    if(fn == "succesful" && s == "admin"){
      res.redirect('/admin')
     
    } else {
        res.cookie('username', un, {maxAge: 3600000});
        res.redirect('back')
    }

  })
})
app.post('/fav', function(req, res){
  modules.buildFavTable(req.body.user, function( fn ){
    console.log("response from favorties module ", fn)
    res.json(fn)
  })
})
app.get('/thankyou', function(req, res){
  res.send("thank")
})
app.post('/register', function(req, res){
  var s = sanitize.blacklist(req.body.newUser, '\'<>&""/\\[\\]()')
  var p = sanitize.blacklist(req.body.newPass, '\'<>&""/\\[\\]()')
  var kv = modules.hash(p)
  var pass = kv.hashed
  var salt = kv.salt
  console.log(s, 'test@test.test', pass, salt)
  modules.registerE(s, 'test@test.test', pass, salt, function( fn ){
    if (fn == "1062"){
      res.send("please choose a different username")
    } else {
      res.cookie('username', s)
      res.send("account created")
      res.redirect('back')
    }
  })
})

app.post('/review', function(req, res) {
  var beer = req.body.beer; //name is the beers Name
  var user = req.body.user; //the current users
  var rating = req.body.score; //the rating
  modules.review(user, beer, rating);
  res.redirect('back')
});
app.post('/addBeers', function(req, res){
  console.log(req.body)
  var name = req.body.beerName
  var type = req.body.type
  var description = req.body.description
  var price = req.body.price
  var l = name.length
  for(var i in l){
    modules.addBeers(beerName[i], type[i], description[i], price[i])
  }
  res.redirect('back')
})
app.post('/removeBeer', function(req, res){
  modules.offTap(req.body.beerName)
  res.redirect('back')
})
app.listen(80);
