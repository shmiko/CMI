/**
 * Created by pauljones on 12/11/15.
 */
// Dependencies
var mongoose        = require('mongoose');
var User            = require('../models/user.js');
var Event           = require('../models/event.js');
var Account           = require('../models/account.js');
// Load the module dependencies
// var users = require('../controllers/users.server.controller');
var passport        = require('passport');
// define model =================
var Todo = mongoose.model('Todo', {
    text: String,
    category: String,
    completed: Boolean,
    createdAt: Date,  
    updatedAt: Date,
});




// var Schema = mongoose.Schema;
var schema = new mongoose.Schema({ name: 'string', size: 'string' });    
/**
 * Todo Schema
 */
// var Tank = mongoose.model('Tank', yourSchema);
var Tank = mongoose.model('Tank', schema);
var small = new Tank({ size: 'small' });
small.save(function (err) {
  if (err) return handleError(err);
  // saved!
})

// var TodoSchema = new Schema({
//   text: String,
//   completed: Boolean,
//   createdAt: Date,  
//   updatedAt: Date,
// });

// Todo.pre('save', function(next, done){
//   if (this.isNew) {
//     this.createdAt = Date.now();
//   }
//   this.updatedAt = Date.now();
//   next();
// });

// mongoose.model('Todo', TodoSchema);




// Opens App Routes
module.exports = function(app) {

    // Load the 'index' controller
    // var index = require('../controllers/index.server.controller');

    // Mount the 'index' controller's 'render' method
    // app.get('/', index.render);


// --------------------------------------------------------
// --------------------------------------------------------
//          Start of Event Routes
// --------------------------------------------------------
// --------------------------------------------------------
    // Retrieve records for all events in the db
    app.get('/events', function(req, res){
        // Uses Mongoose schema to run the search (empty conditions)
        var query = Event.find({});
        query.exec(function(err, events){
            if(err)
                res.send(err);
            // If no errors are found, it responds with a JSON of all events
            res.json(events);
        });
    });

    // Provides method for saving new events in the db
    app.post('/events', function(req, res){
        //var parseBody = JSON.parse(req.body);
        // Creates a new Event based on the Mongoose schema and the post bo.dy
        //var newevent = new Event(JSON.parse(req.body));
        //var newevent = new Event(req.body);
         var newevent = new Event({
            eventname: req.body.eventname,
            eventtype: req.body.eventtype,
            duration: req.body.duration,
            mustdo: req.body.mustdo,
            location: req.body.location
         });
         console.log("newevent parsed data is ", req.body);
        // New Event is saved in the db.
        newevent.save(function(err,resp){
            if (err) { 
                console.log(err)
                res.send({
                    message: 'something went wrong'
                });
            } else {
                res.send({
                    message:'Successfully created a new event'
                });
            }
        });
    });

    // app.post('/query/', function (req, res, next) {
    //   console.log(req.body);
    //   //res.json(req.body);
    //   next();
    // });
    
    // Retrieves JSON records for all users who meet a certain set of query conditions
    app.post('/query/', function(req, res){

        // Grab all of the query parameters from the body.
        var lat             = req.body.latitude;
        var long            = req.body.longitude;
        var distance        = req.body.distance;
        var business        = req.body.business;
        var family          = req.body.family;
        var other           = req.body.other;
        var minDuration     = req.body.minDuration;
        var maxDuration     = req.body.maxDuration;
        var mustdo          = req.body.mustdo;
        var reqVerified     = req.body.reqVerified;

        // Opens a generic Mongoose Query. Depending on the post body we will...
        var query = Event.find({});
        console.log("req data is ", req.body.distance);
        // ...include filter by Max Distance (converting miles to meters)
        if(distance){

            // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
            query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

                // Converting meters to miles. Specifying spherical geometry (for globe)
                maxDistance: distance * 1609.34, spherical: true});
        }

        // ...include filter by Gender (all options)
        if(business || family || other){
            query.or([{ 'eventtype': business }, { 'eventtype': family }, {'eventtype': other}]);
        }

        // ...include filter by Min Age
        if(minDuration){
            query = query.where('duration').gte(minDuration);
        }

        // ...include filter by Max Age
        if(maxDuration){
            query = query.where('duration').lte(maxDuration);
        }

        // ...include filter by Favorite Language
        if(mustdo){
            query = query.where('mustdo').equals(mustdo);
        }

        // ...include filter for HTML5 Verified Locations
        if(reqVerified){
            query = query.where('htmlverified').equals("Yep (Thanks for giving us real data!)");
        }

        // Execute Query and Return the Query Results
        query.exec(function(err, events){
            if(err)
                res.send(err);

            // If no errors, respond with a JSON of all users that meet the criteria
            res.json(events);
        });
    });

    // DELETE Routes (Dev Only)
    // --------------------------------------------------------
    // Delete a User off the Map based on objID
    app.delete('/events/:objID', function(req, res){
        var objID = req.params.objID;
        var update = req.body;

        Event.findByIdAndRemove(objID, update, function(err, event){
            if(err)
                res.send(err);
            res.json(req.body);
        });
    });


    app.get('/', function (req, res) {
        res.render('index', { user : req.user });
    });

    app.get('/register2', function(req, res) {
        res.render('register', { });
    });

    app.post('/register2', function(req, res) {
        Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
            if (err) {
                return res.render('register', { account : account });
            }

            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        });
    });


    app.post('/register', function(req, res) {
      User.register(new User({ username: req.body.username }), req.body.password, function(err, account) {
        if (err) {
          return res.status(500).json({err: err});
        }
        passport.authenticate('local')(req, res, function () {
          return res.status(200).json({status: 'Registration successful!'});
        });
      });
    });

    // app.post('/login', function(req, res, next) {
    //   passport.authenticate('local', function(err, user, info) {
    //     if (err) {
    //       return res.status(500).json({err: err});
    //     }
    //     if (!user) {
    //       return res.status(401).json({err: info});
    //     }
    //     req.logIn(user, function(err) {
    //       if (err) {
    //         return res.status(500).json({err: 'Could not log in user'});
    //       }
    //       res.status(200).json({status: 'Login successful!'});
    //     });
    //   })(req, res, next);
    // });

    app.get('/logout', function(req, res) {
      req.logout();
      res.status(200).json({status: 'Bye!'});
    });


    //User routes
    // app.get('/signup', function(req,res,next){
    //     res.render('signup/signup');
    // })


    // app.post('/signup', function(req,res,next) {
    //     var user = new User({
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: req.body.password});

    //     User.findOne({ email: req.body.email }, function(err, existingUser){
    //         if (existingUser){
    //             console.log(req.body.email + " already exists");
    //             return res.redirect('/signup');
    //         } else {
    //             // another way
    //             user.save(function(err){
    //                 if (err) return next(err);
    //                 res.json('successfully created a new user');
    //             });
    //         }
    //         });
    //    }); 

    // Retrieve records for all users in the db
    app.get('/users', function(req, res){
        // Uses Mongoose schema to run the search (empty conditions)
        var query = User.find({});
        query.exec(function(err, users){
            if(err)
                res.send(err);
            // If no errors are found, it responds with a JSON of all events
            res.json(users);
        });
    });    

    app.get('/login', function(req, res) {
        res.render('login', { user : req.user });
    });

    app.post('/login',
      passport.authenticate('local', { successRedirect: '/',
                                       failureRedirect: '/login',
                                       failureFlash: true })
    );

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/ping', function(req, res){
        res.status(200).send("pong!");
    });
        // user.save(function(err,resp){
        //     if (err) { 
        //         console.log(err)
        //         res.send({
        //             message: 'something went wrong'
        //         });
        //     } else {
        //         res.send({
        //             message:'Successfully created a new user'
        //         });
        //     }
        // });
    //});

// --------------------------------------------------------
// --------------------------------------------------------
//          Start of Todo Routes
// --------------------------------------------------------
// --------------------------------------------------------
                // get all todos
    app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text,
            category : req.body.category,
            completed : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });

    // Set up the 'signup' routes 
    // app.route('/signup')
    //    .get(User.renderSignup)
    //    .post(User.signup);

    // Set up the 'signin' routes 
    // app.route('/signin')
    //    .get(User.renderSignin)
    //    .post(passport.authenticate('local', {
    //         successRedirect: '/',
    //         failureRedirect: '/signin',
    //         failureFlash: true
    //    }));

    // Set up the Facebook OAuth routes 
    // app.get('/oauth/facebook', passport.authenticate('facebook', {
    //     failureRedirect: '/signin',
    //     scope: ['email']
    // }));
    // app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
    //     failureRedirect: '/signin',
    //     successRedirect: '/'
    // }));

    // Set up the Twitter OAuth routes 
    // app.get('/oauth/twitter', passport.authenticate('twitter', {
    //     failureRedirect: '/signin'
    // }));
    // app.get('/oauth/twitter/callback', passport.authenticate('twitter', {
    //     failureRedirect: '/signin',
    //     successRedirect: '/'
    // }));

    // Set up the Google OAuth routes 
    // app.get('/oauth/google', passport.authenticate('google', {
    //     scope: [
    //         'https://www.googleapis.com/auth/userinfo.profile',
    //         'https://www.googleapis.com/auth/userinfo.email'
    //     ],
    //     failureRedirect: '/signin'
    // }));
    // app.get('/oauth/google/callback', passport.authenticate('google', {
    //     failureRedirect: '/signin',
    //     successRedirect: '/'
    // }));

    // Set up the 'signout' route
    // app.get('/signout', users.signout);

};