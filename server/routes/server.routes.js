// Dependencies
var mongoose        = require('mongoose');
var Event            = require('../models/event.js');


// Opens App Routes
module.exports = function(app) {

    // GET Routes
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

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new events in the db
    app.post('/events', function(req, res){

        // Creates a new Event based on the Mongoose schema and the post bo.dy
        var newuser = new Event(req.body);

        // New Event is saved in the db.
        newuser.save(function(err){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new event
            res.json(req.body);
        });
    });

    // Retrieves JSON records for all events who meet a certain set of query conditions
    app.post('/query/', function(req, res){

        // Grab all of the query parameters from the body.
        var lat             = req.body.latitude;
        var long            = req.body.longitude;
        var distance        = req.body.distance;
        // var male            = req.body.male;
        // var female          = req.body.female;
        // var other           = req.body.other;
        // var minAge          = req.body.minAge;
        // var maxAge          = req.body.maxAge;
        // var favLang         = req.body.favlang;
        // var reqVerified     = req.body.reqVerified;

        // Opens a generic Mongoose Query. Depending on the post body we will...
        var query = Event.find({});

        // ...include filter by Max Distance (converting miles to meters)
        if(distance){

            // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
            query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

                // Converting meters to miles. Specifying spherical geometry (for globe)
                maxDistance: distance * 1609.34, spherical: true});

        }

        // ...include filter by Gender (all options)
        // if(male || female || other){
        //     query.or([{ 'gender': male }, { 'gender': female }, {'gender': other}]);
        // }

        // // ...include filter by Min Age
        // if(minAge){
        //     query = query.where('age').gte(minAge);
        // }

        // // ...include filter by Max Age
        // if(maxAge){
        //     query = query.where('age').lte(maxAge);
        // }

        // // ...include filter by Favorite Language
        // if(favLang){
        //     query = query.where('favlang').equals(favLang);
        // }

        // // ...include filter for HTML5 Verified Locations
        // if(reqVerified){
        //     query = query.where('htmlverified').equals("Yep (Thanks for giving us real data!)");
        // }

        // Execute Query and Return the Query Results
        query.exec(function(err, events){
            if(err)
                res.send(err);

            // If no errors, respond with a JSON of all events that meet the criteria
            res.json(events);
        });
    });

    // DELETE Routes (Dev Only)
    // --------------------------------------------------------
    // Delete a Event off the Map based on objID
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