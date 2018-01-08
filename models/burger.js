// import orm from config
var orm = require('../config/orm.js');

var burger = {
//all
    all: function (cb) {
        orm.all('burgers', function (res) {
            cb(res);
        });
    },
//add a burger to burgers table
    add: function (cols, vals, cb) {
        orm.add('burgers', cols, vals, function (res) {
            cb(res);
        });
    },
//update if a burger is devoured
    update: function (objColVals, state, cb) {
        orm.update('burgers', objColVals, state, function (res) {
            cb(res);
        });
    }
};

module.exports = burger;