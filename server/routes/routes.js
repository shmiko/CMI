/**
 * Created by pauljones on 12/11/15.
 */
// Dependencies
var mongoose        = require('mongoose');
//var User            = require('../models/user.js');
var Event            = require('../models/event.js');

// Opens App Routes
module.exports = function(app) {
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
};