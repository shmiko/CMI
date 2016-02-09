/**
 * Created by pauljones on 12/11/15.
 */
// Dependencies
// Invoke 'strict' JavaScript mode
'use strict';
// Set the 'NODE_ENV' variable
// process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// -----------------------------------------------------
var express         = require('express');
var mongoose        = require('mongoose');
//var port            = process.env.PORT || 8080;
var database        = require('./config/config');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var cookieParser 	= require('cookie-parser');
// var debug 			= require('debug')('cmi:server');
var path 			= require('path');
var passport = require('passport');

require('./models/Posts');
require('./models/Comments');
require('./models/Users');
require('./config/passport');
// Sets the connection to MongoDB
mongoose.connect(database.aws.url1);

var routes = require('./routes/routes.js');//(app);
var users = require('./routes/users');

var app             = express();

app.set('views', path.join(__dirname, '../client/views'));
app.set('view engine', 'ejs');
// Express Configuration
// -----------------------------------------------------

//mongoose.connect("mongodb://localhost/calmapit");
// var port = normalizePort(process.env.PORT || '8080');
// app.set('port', port);

// Logging and Parsing
app.use(morgan('dev'));                                         // log with Morgan
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json
app.use(cookieParser());
app.use(methodOverride());

// app.use(express.static(__dirname + '/../client'));                 // sets the static files location to public
app.use('/bower_components',  express.static(__dirname + '/../bower_components')); // Use BowerComponents

app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../client/app')));
app.use(express.static(path.join(__dirname, '../client/views')));

app.use(passport.initialize());
// Routes
// ------------------------------------------------------
app.use('/', routes);
app.use('/users', users);
// app.use('/', routes);
// require('./routes/todo.routes.js')(app);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
// Listen
// -------------------------------------------------------
// app.listen(port);
// app.on('error', onError);
// app.on('listening', onListening);
// console.log('CMI listening on port ' + port);

// function normalizePort(val) {
//   var port = parseInt(val, 10);

//   if (isNaN(port)) {
//     // named pipe
//     return val;
//   }

//   if (port >= 0) {
//     // port number
//     return port;
//   }

//   return false;
// }

/**
 * Event listener for HTTP server "error" event.
 */

// function onError(error) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }

//   var bind = typeof port === 'string'
//     ? 'Pipe ' + port
//     : 'Port ' + port;

//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }




// /**
//  * Event listener for HTTP server "listening" event.
//  */

// function onListening() {
//   var addr = server.address();
//   var bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   debug('Listening on ' + bind);
// }


module.exports = app;