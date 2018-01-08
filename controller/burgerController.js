//require dependencies
const express = require('express');
const router = express.Router();

//require my model
const burger = require('../models/burger');

//create routes
router.get('/', (req, res) => {
    burger.all((data) => {
        var hbsObj = {
            burgers: data
        };
        console.log(hbsObj)
        res.render('index', hbsObj)
    });
});
//route for adding new burger to table
router.post("/burgers", (req, res) => {
    burger.add([
        "burger_name"
    ], [
        req.body.burger_name
    ], (data) => {
        res.redirect('/')
    });
});
//route for updating devoured in the burgers table
router.put('/burgers/:id', (req, res) => {
    const state = `id = ${req.params.id}`;

    burger.update({
        devoured: true
    }, state, (data) => {
        res.redirect('/')
    })
});

module.exports = router