var port = 80;
var http = require('http');
var util = require('util');
var exec = require('child_process').exec;
var express = require('express');
var app = express.createServer();

app.set("view engine", "jade");

app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.use(express.errorHandler({showStack:true, dumpExceptions:true}));

testMobile = function(ua){
  var regex = /(iphone|ppc|windows ce|blackberry|opera mini|mobile|palm|portable)/i;
  return regex.test(ua);
}

app.get('/', function(req, res, next) {
  var ua = req.header('user-agent');

  var layout = true;

  if(testMobile(ua)) {
    layout = 'mobile';
  }

//  if(!req.params.path){
    res.render('index', {'layout': layout});
//  }
//  else{
//    res.render(req.params.path, {'layout': layout});
//  }
});

app.listen(port);

