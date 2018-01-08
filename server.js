//require dependencies
const express = require('express');
const bodyParser = require('body-parser')
const methodOverride = require('method-override');
const exphbs = require('express-handlebars')
//set upp express
const app = express();
//set the port
var PORT = process.env.PORT || 3000;
//serve static pages
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(methodOverride('_method'))
//set view engine

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//require my burgerController from the controller folder
const routes = require("./controller/burgerController.js");

app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Server is up at port ${PORT}`)
})