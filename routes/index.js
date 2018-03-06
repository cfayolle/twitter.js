const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

// router.get("/stylesheets/style.css",function(req,res,next){
// 	res.sendFile("../views/",function(err){
// 		if(err) next(err);
// 		else console.log("Sent");
// 	});
// });

module.exports = function (io) {
  // ...
  // route definitions, etc.
  // ...
	router.get('/', function (req, res) {
	  let tweets = tweetBank.list();
	  //console.log(tweets);
	  res.render( 'index', { tweets: tweets , showForm: true}, );
	});

	router.get('/users/:name', function(req, res) {
	  var nameFind = req.params.name;
	  var list = tweetBank.find( {'name': nameFind} );
	  res.render ( 'index', { tweets: list, showForm: false});
	});

	router.get('/tweets/:id', function(req, res) {
	  var id = parseInt(req.params.id);
	  var list = tweetBank.find ( {'uniqueId': id} );
	  res.render ( 'index', {solo: list, showForm: false} );
	});

	router.post('/tweets', function(req, res) {
	  var name = req.body.name;
	  var text = req.body.text;
	  tweetBank.add(name, text);
	  // var id = tweetBank.data[tweetBank.length-1];
	  io.sockets.emit("newTweet",{"name":name,"content": text});
	  res.redirect('/');
	});
  return router;
};

// console.log("Print as str",io);