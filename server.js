//server.js

'use strict';

//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Link = require('./models/links.js');

//and create our instances
var app = express();
var router = express.Router();
//set our port to either a predetermined port number if you have set
//it up, or 3001
var port = process.env.API_PORT || 3001;

mongoose.connect("mongodb://slackbot:hellobot@ds135234.mlab.com:35234/flaxxiebase");

//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use(express.static(`${__dirname}/client/build`));

//now we can set the route path & initialize the API
router.get('/', function (req, res) {
    res.json({message: 'API Initialized!'});
});

router.route('/links')
    .get(function(req, res){
        Link.find(function(err, links){
            if(err){
                res.send(err);
            } else {
                res.json(links);
            }
        });
    })
    .post(function(req, res){
        console.log(req.body);
        var newLink = new Link();
        newLink.name = req.body.name;
        newLink.instructions = req.body.instructions;
        newLink.starter = req.body.starter;
        newLink.solution = req.body.solution;
        newLink.date = Date.now();

        newLink.save(function(err){
            if(err){
                res.send(err);
            } else {
                res.json({
                    message: "Successfully posted link!"
                })
            }
        })
    });

//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function () {
    console.log('api running on port');
});
