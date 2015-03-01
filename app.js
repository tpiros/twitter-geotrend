/*
Setup Express server
*/
var express = require('express'),
app = module.exports = express(),
server = require('http').createServer(app),
routes = require('./routes'),
api = require('./routes/api');

// Express middlware
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Express configuration
app.locals.pretty = true;
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));
app.use('/components', express.static(__dirname + '/components'));
app.use('/js', express.static(__dirname + '/js'));
// app.use(app.router);
app.engine('html', require('ejs').renderFile);

server.listen(3000, "localhost",  function(){
  console.log("Express server up and running.");
});

app.get('/', routes.index);
app.get('/api/trends/:woeid', api.trends);