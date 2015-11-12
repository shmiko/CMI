/**
 * Created by pauljones on 12/11/15.
 */
// Dependencies
var mongoose        = require('mongoose');
//var User            = require('../models/user.js');
var Event            = require('../models/event.js');
// Opens App Routes
module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db
    //app.get('/users', function(req, res){
    //
    //    // Uses Mongoose schema to run the search (empty conditions)
    //    var query = User.find({});
    //    query.exec(function(err, users){
    //        if(err)
    //            res.send(err);
    //
    //        // If no errors are found, it responds with a JSON of all users
    //        res.json(users);
    //    });
    //});

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new users in the db
    //app.post('/users', function(req, res){
    //
    //    // Creates a new User based on the Mongoose schema and the post bo.dy
    //    var newuser = new User(req.body);
    //
    //    // New User is saved in the db.
    //    newuser.save(function(err){
    //        if(err)
    //            res.send(err);
    //
    //        // If no errors are found, it responds with a JSON of the new user
    //        res.json(req.body);
    //    });
    //});

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
        console.log("req data is ", req.body);
        // Creates a new Event based on the Mongoose schema and the post bo.dy
        //var newevent = new Event(JSON.parse(req.body));
        var newevent = new Event(req.body);
         //var newevent2 = new Event({
         //    eventname: req.body.eventname,
         //    eventtype: req.body.eventtype,
         //    duration: req.body.duration,
         //    mustdo: req.body.mustdo,
         //    location: req.body.location
         //});
         console.log("newevent parsed data is ", newevent);
        // New Event is saved in the db.
        newevent.save(function(err){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new user
            res.json(req.body);
        });
    });
};