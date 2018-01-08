//import connection
const connection = require('./connection')
//function to generate question marks for SQL syntax
function makeQuestionMark(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?")
  }

  return arr.toString()
}

function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    arr.push(`${key} = ${ob[key]}`);
  }

  return arr.toString();
}

var orm = {
  //get everything from the table
  all: function (tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  //function to add a new item into the table
  add: function (table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += makeQuestionMark(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // function for updating the burgers changing updating devoured to true
  update: function (table, objColVals, state, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += state;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
}

//export the orm
module.exports = orm;