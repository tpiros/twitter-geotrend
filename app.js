/*
Setup Express server
*/
var express = require('express'),
app = module.exports = express(),
server = require('http').createServer(app),
routes = require('./routes'),
api = require('./routes/api');

app.configure(function() {
  app.locals.pretty = true;
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use('/components', express.static(__dirname + '/components'));
  app.use('/js', express.static(__dirname + '/js'));
  app.use(app.router);
  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);
});
server.listen(3000, "192.168.56.102",  function(){
  console.log("Express server up and running.");
});

app.get('/', routes.index);
app.get('/api/trends/:woeid', api.trends);