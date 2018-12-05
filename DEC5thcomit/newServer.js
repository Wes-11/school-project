var express = require("express");
var app     = express();
var path    = require("path");
var http = require('http');
var sanitize = require('validator')
var modules = require('/modules.js')
var db = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "Hx$_yab@i#3ZM2^1_G=t!6eXT",
  database: "web_app_final"
}); //makes use of auto timeout native to the package
//app.use(express.static('use absolute path for testing'));
//lots of things commented out because it's 2AM and I can't be bothered to go double checking form names
app.use(express.static('/'));
app.get('/',function(req,res){
  //another absolute path for path.join(''));
res.sendFile(path.join('/main.html'));
});
app.get('/beer', function(req,res){
  functions.getBeers(function(data){
    res.send(data);
  })
res.sendFile(path.join('/main.html'));
});
app.post('/login',function(req,res){
  var password = req.body.psw;
  var name = req.body.uName;
  sanitize.escape(name);
  sanitize.escape(password);

  // var v = test.log(name, password, function(fn){
  //    console.log(fn)
//   //res.send(fn); //this should just be a file path
// });

});
app.post('/register',function(req,res){
  var password = req.body.psw;
  var username = req.body.Uname;
  sanitize.escape(name);
  sanitize.escape(password);
  //signature to be use is as follows
  // test.isunique(name,email,password, function( fn ){
//   console.log("duplicates found =", fn);
//   if(fn != 0){
//     //console.log(fn)
//     console.log("choose a different username")
//   } else {
//       test.createAccount("dave","testmail","password")
//       console.log("account created")
//  response will just be the main page but with a details cookie attached
//   };
// });
});
app.post('/review', function(req,res){
  var name = req.body.name; //name is the beers Name
  var user = req.body.user;//the current users
  var rating = req.body.score;
  //api signature below, do not prevent duplicates and incorporate an update function
  //controls review scores
  // test.updateFav("nameTest5", "admin", 4.1);
  //
  // test.getUnique("admin", "nameTest5", function( fn ){
//   if(fn == 0){
//       test.review("nameTest5", "admin", 2.3)
//   } else {
//
//   }
// });

  //var sInput = sanitize.escape(input);
  //var checked = sanitize.isFloat(input{min:0.0, max: 5.0});
  // if (checked == false){
  //   res.send("please reduce your value");
  // };

});
var server=http.createServer(function(req,res){
    res.end('test');
});
app.listen(3050);
