var port = 80;
var url = require('url');
var http = require('http');
var util = require('util');
var exec = require('child_process').exec;
var express = require('express');
var app = express.createServer();
var fs = require('fs');

app.set("view engine", "jade");

app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.use(express.errorHandler({showStack:true, dumpExceptions:true}));

testMobile = function(ua){
  var regex = /(iphone|ppc|windows ce|blackberry|opera mini|mobile|palm|portable)/i;
  return regex.test(ua);
}


app.get('*', function(req, res, next) {
  var ua = req.header('user-agent');
  var parsed = url.parse(req.url);

  var layout = true;

  if(testMobile(ua) || req.headers.host.substring(0,1) == "m") {
    layout = 'mobile';
  }

  var pathname = parsed.pathname;
//  res.end(pathname);
  if(!pathname || pathname === '/'){
    res.render('index', {'layout': layout, 'pathname': pathname});
  }
  else {
    // Attempt to find the referenced jade file and render that.
    fs.stat( (__dirname+"/views"+pathname+'.jade'), function(err, stats){
      if(stats) {
        res.render(pathname.substring(1), {'layout': layout, 'pathname': pathname});
      }
      else {
        next();
      }

    });

  }
});

app.listen(port);

