var port = process.env.PORT ? process.env.PORT : 80;
var url = require('url');
var express = require('express');
var app = express.createServer();
var fs = require('fs');

app.set("view engine", "jade");

app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.use(express.errorHandler({showStack:true, dumpExceptions:true}));

var testMobile = function(req){
  var regex = /(iphone|ppc|windows ce|blackberry|opera mini|mobile|palm|portable)/i;
  var mobile_agent = regex.test(req.header('user-agent'));

  var mobile_subdomain = (req.headers.host.substring(0,1).toLowerCase() == "m");

  return mobile_agent || mobile_subdomain;
};

var menu_items = require("./menu.js");

app.get('/health', function(req, res){
  res.send({
    pid: process.pid,
    memory: process.memoryUsage(),
    uptime: process.uptime()
  });
});

/**
 * Generic "get" attempts to route to know JADE files.
 * If no known JADE files, then we pass routing to next() (should be static).
 */
app.get('*', function(req, res, next) {
  'use strict';

  var layout = testMobile(req) ? 'mobile_layout' : true;
  var pathname = url.parse(req.url).pathname.toLowerCase(); // make matching case insenstive
  
  // first case renders no path
  if(!pathname) {
    res.render('index', {'layout': layout, 'pathname': pathname, 'menu_items': menu_items});
  }
  // second case renders a "folder" ending in /
  else if (pathname === '/' || pathname.charAt(pathname.length-1) === '/' ){
    res.render(__dirname + '/views' + pathname + 'index.jade', {'layout': layout, 'pathname': pathname, 'menu_items': menu_items});
  }
  else {
    // Attempt to find the referenced jade file and render that.
    fs.stat( (__dirname + "/views" + pathname + '.jade'), function(err, stats){
      if(err || !stats) {
        next();
      }
      else{
        res.render(pathname.substring(1), {'layout': layout, 'pathname': pathname, 'menu_items': menu_items});
      }
    });

  }
});

app.listen(port);

process.on('uncaughtException', function (err) {
  console.error('uncaughtException:', err.message);
  console.error(err.stack);
  process.exit(1);
});