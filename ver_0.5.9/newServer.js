var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var mysql = require('mysql');
var path = require('path');
var http = require('http');
var https = require('https')
var sanitize = require('validator')
var modules = require('path_to_modules')//should be a full filepath
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
//app.use(express.static('use absolute path for testing'));
//lots of things commented out because it's 2AM and I can't be bothered to go double checking form names
//                      C:\Users\Wes\Desktop\milestone4\webAppScripts.js
app.use(express.static('file_path_to_dir')); //full file path again
app.get('/index', function(req, res) {
  //'C:/Users/Wes/Desktop/MILE_STONE_4/index.html'
  //another absolute path for path.join(''));
  res.sendFile(path.join('full_path'));  //full file path again
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
    app.sendFile('full_path')
});
app.post('/log', function (req, res) {
  //the mount point is actaully just the name of the function
  var pw = req.body.passT;
  var un = req.body.userT;
  var s = sanitize.blacklist(un, '\'<>&""/\\[\\]()')
  var p = sanitize.blacklist(pw, '\'<>&""/\\[\\]()')
  var v = modules.log(s, p, function(fn){
    console.log(fn)
    if(fn == "succesful" && s == "admin"){
      app.redirect('/admin')
        //res.sendFile(path.join('C:/Users/Wes/Desktop/milestone4/admin.html'));
    } else {
        res.cookie('username', un);
        res.redirect('back')
        //res.sendFile(path.join('C:/Users/Wes/Desktop/milestone4/index.html'));
    }

  })
})
app.post('/fav', function(req, res){
  console.log("/fav",req.body)
  console.log("/fav",req.body)
  modules.buildFavTable(req.body.user, function( fn ){
    console.log("response from favorties module ", fn)
    res.json(fn)
  })
  //res.end()
})
//the old register method works but its really bad, new one performs much better and more reliably
app.get('/thankyou', function(req, res){
  res.send("thank")
})
app.post('/register', function(req, res){
  var s = sanitize.blacklist(req.body.newUser, '\'<>&""/\\[\\]()')
  var p = sanitize.blacklist(req.body.newPass, '\'<>&""/\\[\\]()')
  console.log(s,p)
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
  //add sanitizing functions here, it works but is unsafe
  modules.review(user, beer, rating); //new procedure is now working, and much faster than the old method
  res.redirect('back')
});
app.post('/addBeers', function(req, res){
  name = req.body.beerName
  type = req.body.type
  description = req.body.description
  price = req.body.price
  l = name.length
  for(var i in l){
    //should really put a delay on this function, might get ahead of the query
    modules.addBeers(name[i], type[i], description[i], price[i])
  }

  //test.addBeers(name, type, description, price)
})
app.post('/removeBeer', function(req, res){
  modules.offTap(req.body.name)
})
// var server = http.createServer(function(req, res) {
//   res.end('C:/Users/Wes/Desktop/milestone4/index.html');
// });
app.listen(3023);
