const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const routes = require("./routes");
const bodyParser = require("body-parser");
var socketio = require('socket.io');
// ...

var server = app.listen(3000);
var io = socketio.listen(server);

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/",routes(io));

app.use(function (req, res, next) {
    // do your logging here
    // call `next`, or else your app will be a black hole — receiving requests but never properly responding
    res.on("finish", function(){
    	console.log(req.method,req.path,res.statusCode); 
    }); 
    next();
});

app.use(express.static("public"));

app.get('/', (req, res) => res.render('index'));
