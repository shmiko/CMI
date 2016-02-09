// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var passport = require('passport'),
	mongoose = require('mongoose');
var User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
	function(username, password, done) {
		User.findOne({username: username.toLowerCase()}, function(err, user) {
			if(err) { return done(err); }
			if(!user) {
				return done(null, false, {message: 'Incorrect username or password.'});
			}
			if(!user.validPassword(password)) {
				return done(null, false, {message: 'Incorrect username or password.'});
			}
			return done(null, user);
		});
	}
));