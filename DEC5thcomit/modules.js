var db = require('./dbWrapper')
const crypto = require('crypto');

module.exports = {
  getBeers : function(fn){
    db.query("SELECT * FROM beers", function(err, result, fields){
      db.end();
      if(err) throw err;
      fn(result);
      //return result;
    });
  },
  hash : function(password, salt= null){
    if(salt != null){
      const key = crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha512');
      return key.toString('hex');
    } else {
      var userSalt = crypto.randomBytes(32).toString('hex');
      const key = crypto.pbkdf2Sync('password', userSalt, 10000, 32, 'sha512');
      return {hashed:key.toString('hex'), salt:userSalt};
    }
  },
  log: function( name, password, fn ){
    var methods = require('/modules.js');
    sql = "SELECT password, salt FROM users WHERE username = ?"
    var name = name;
    db.query(sql, name, function (err, result){
      if(err) throw err;
      hashed = methods.hash(password, result[0].salt);
      if (hashed == result[0].password){
        fn("succesful")
      } else {
        fn("wrong");
      }
    })
  },

  isunique : function(name,email,password, fn){
    var sql = "SELECT COUNT (username) as total FROM users WHERE username = ?"
    db.query(sql, name, function (err, result){
       if(err) throw err;
       fn(result[0].total);
    });
  },
  createAccount : function(name, email, password){
    var methods = require('/modules.js');
    var hashed = methods.hash(password);
    var pass = hashed.hashed;
    var salt = hashed.salt;
    var sql = "INSERT INTO users (username, email, password, salt) VALUES ?"
    var values = [
      [name, email, pass, salt]
    ];
    console.log(values);
    db.query(sql, [values], function(err,result){
      if(err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  },
  review : function (beer,user,rating){
    var sql = "INSERT INTO favorites (beername, username, rating) VALUES ?"
    var values = [[beer,user,rating]];
    db.query(sql, [values], function (err, result){
      if(err) throw err;

    });
  },
  getUnique : function(user,beer, fn){
    var sql = "SELECT COUNT (*) as total FROM favorites WHERE (beername , username) = ?"
    var values = [[beer, user]];
    db.query(sql, [values],  function(err,result){
      if(err) throw err;
      fn(result[0].total);
    })
  },
  updateFav : function(beer, name, rating){
    var sql = "UPDATE favorites SET rating = "+rating+" WHERE (beername , username) = ?"
    var values = [[ beer, name]];
    db.query(sql, [values],  function(err,result){
      if(err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    })
  },
  buildFavTable : function(name, fn){
    // test.buildFavTable(name, function(fn){
    //   console.log(fn)
    // }); signature
    var sql = " SELECT beers.beername, beers.type, beers.description, beers.price, favorites.username" +
              " FROM beers RIGHT JOIN favorites" +
              " ON beers.beername = favorites.beername" +
              " WHERE favorites.username = ?";
    db.query(sql,[name], function(err,result){
    //db.query(sql, function(err, result){
        if(err) throw err;
        //console.log(result);
        fn(result);
      });
  },
};//end of export array
console.log("all good");
