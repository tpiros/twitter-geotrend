/*
Twitter API integration
*/
var Twit = require('twit'),
config = require('../config'),
events = require('events'),
eventEmitter = new events.EventEmitter(),
T = new Twit(config);

exports.trends = function(req, res) {
  var woeid = req.params.woeid;
  T.get('trends/place', {id: woeid}, function(err, data) {
    if (typeof data === "undefined") {
      res.json({status: false});
    } else {
      res.json({trends: data, status: true});
    }
  });
};