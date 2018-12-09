//var db = require('./dbWrapper')
const crypto = require('crypto');

module.exports = {

  hash: function(password, salt = null) {
    if (salt != null) {
      const key = crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha512');
      return key.toString('hex');
    } else {
      var userSalt = crypto.randomBytes(32).toString('hex');
      const key = crypto.pbkdf2Sync('password', userSalt, 10000, 32, 'sha512');
      return {
        hashed: key.toString('hex'),
        salt: userSalt
      };
    }
  },
  log: function(name, password, fn) {
    var methods = require('path_to_this_file');
    sql = "SELECT password, salt FROM users WHERE username = ?"
    var name = name;
    db.query(sql, name, function(err, result) {
      if (err) throw err;
      hashed = methods.hash(password, result[0].salt);
      if (hashed == result[0].password) {
        fn("succesful")
      } else {
        fn("wrong");
      }
    })
  },
  buildFavTable: function(name, fn) {
    // test.buildFavTable(name, function(fn){
    //   console.log(fn)
    // }); signature
    console.log("reached module", name)
    var sql = " SELECT beers.beername, beers.type, beers.description, beers.price, favorites.rating" +
              " FROM beers RIGHT JOIN favorites" +
              " ON beers.beername = favorites.beername" +
              " WHERE favorites.username = ?";
    db.query(sql, [name], function(err, result) {
      if (err) throw err;
      fn(result);
    });
  },
  getBeersE: function(fn) {
    db.getConnection(function(err, connection) {
      var sql = "SELECT " +
                  " l.beername, l.type, l.description, l.price," +
                " COALESCE(AVG(r.Rating), 0) AS Rating" +
                    " FROM beers AS l" +
                " LEFT JOIN favorites AS r ON l.beername = r.beername" +
                  " GROUP BY l.beername, l.type, l.description, l.price";
      connection.query(sql, function(err, result) {
        if (err) {
          throw err;
        }
        connection.release();
          fn(result);
      })
    })
  }, //end of getBeersE
  registerE: function(name, email, password, salt, fn) {
    db.getConnection(function(err, connection) {
      var values = [name, email, password, salt];
      var sql = "INSERT INTO users (username,email, password, salt) " +
                "SELECT ? " +
                "WHERE NOT EXISTS (SELECT username " +
                "FROM users " +
                "WHERE username = 'connection.escap(values[0])')";
      connection.query(sql, [values], function(err, result) {
        if (err) {
          var error = err.message;
          var e = error.substring(0, error.indexOf(":"));
          if (e == "ER_DUP_ENTRY") {
            fn("1062")
            return ("")
            //async javascript error handling is weird
          } else {
            fn("success")
          }
          throw err; //throw literally any other error
        }
        connection.release();
        fn(result)
      })
    })
  }, //end of registerE
  //curation functions
  addBeers: function(name, type, description, price) {
    console.log(name, type, description, price)
    db.getConnection(function(err, connection) {
      var sql = "INSERT INTO beers (beername, type, description, price) VALUES ?";
      var values = [
        [name, type, description, price]
      ];
      connection.query(sql, [values], function(err, result) {
        connection.release()
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      })
    })
  },
  offTap: function(name) {
    db.getConnection(function(err, connection) {
      var sql = "UPDATE beers " +
                "SET on_tap = 0 " +
                "WHERE beername = ?";
      connection.query(sql, [name], function(err, result) {
        if (err) throw err;
        connection.release()
        console.log(result.affectedRows + " record(s) updated");
      })
    })
  },
  review : function(name, beer, rating){
  db.getConnection(function(err, connection){
    var values = [name, beer, rating];
    connection.query("CALL review(?,?,?);", values, function(err, result){
        if(err) throw err;
        connection.release()
        console.log(result)
    })
  })
}
}; //end of export array
console.log("all good");



//this is the stored procedure from the review function
// CREATE DEFINER=`root`@`localhost` PROCEDURE `rate_beer`(uname varchar(255) , bname varchar(255), urate float)
// BEGIN
//  IF EXISTS (SELECT rating FROM favorites WHERE username=uname AND beername=bname) THEN
//        UPDATE favorites SET rating = urate WHERE (username=uname AND beername=bname);
//     ELSE
//        INSERT INTO favorites (username,beername, rating) VALUES (uname,bname, urate);
//        END if;
// END
