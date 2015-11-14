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

    app.post('/query/', function (req, res, next) {
      console.log(req.body);
      //res.json(req.body);
      next();
    });
    
    // Retrieves JSON records for all events who meet a certain set of query conditions
    app.post('/query/', function(req, res){
        
        // Grab all of the query parameters from the body.
        var coords = [];
        var lat             = req.body.latitude;
        var long            = req.body.longitude;
        // coords[0] = long;
        // coords[1] = lat;
        // console.log("coords are ",coords);
        // var ndistance        = req.body.distance / 6371000;

        // get the max distance or set it to 8 kilometers
        var maxDistance = req.body.distance;
        console.log("max dist is now ",maxDistance);
        // we need to convert the distance to radians
        // the raduis of Earth is approximately 6371 kilometers
        maxDistance /= 6371;
        console.log("2nd max dist is now ",maxDistance);
        
        // Opens a generic Mongoose Query. Depending on the post body we will...
        var query = Event.find({});
        // var qry; //= Event.find({
        //               location: {
        //                 $near: coords,
        //                 $maxDistance: maxDistance
        //               }
        //             })

        // ...include filter by Max Distance (converting miles to meters)
        if(maxDistance){

            // Event.find({}).where(
            //   'location': {
            //     $near: coords,
            //     $maxDistance: maxDistance
            //   }
            // }).limit(20).exec(function(err, events) {
            //   if (err) {
            //     return res.json(500, err);
            //   }

            //   res.json(200, events);
            // });

            // 2dsphere Index
            // If the collection has a 2dsphere index instead, you can also specify the optional $minDistance specification. For example, the following example returns the documents whose location is at least 0.0004 radians from the specified point, ordered from nearest to farthest:
            //near works also

            // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
            query = query.where('location').near({ geometry: {type: 'Point', coordinates: [long, lat]},maxDistance: 100});
            // query = query.where('location').near: 
            //         {
            //          $geometry: { type: "Point", coordinates: [ -95.56, 29.735 ]},
            //          $maxDistance: 0.004
                     
            //         }
            //       }
            // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
            //query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},
            // Converting meters to miles. Specifying spherical geometry (for globe)
            //maxDistance: distance, spherical: true});
            //query.where('location').within({ center: coords, radius: distance, unique: true, spherical: true });
            // query = query.where('location').near({
            //     center: [long, lat],
            //     maxDistance: distance,
            //     spherical: true
            // });
            
                //shell query
                //does work
                // // db.events.find({ location:
                //   {$near: 
                //     {
                //      $geometry: { type: "Point", coordinates: [ -95.56, 29.735 ]},
                //      $maxDistance: 0.004
                     
                //     }
                //   }
                // });
                //doesn't work
                // query = db.events.find(
                //    {
                //      location:
                //        { $near :
                //           {
                //             $geometry: { type: "Point",  coordinates: [ 117.598, -28.768 ] },
                //             $minDistance: 1000,
                //             $maxDistance: 5000
                //           }
                //        }
                //    }
                // )
                // doesn't work
                // db.events.find(
                //        {
                //          location: {
                //             $nearSphere: {
                //                $geometry: {
                //                   type : "Point",
                //                   coordinates : [ 117.598, -28.768 ]
                //                },
                //                $maxDistance: 0.004
                               
                //             }
                //          }
                //        }
                //     )

                // Converting meters to miles. Specifying spherical geometry (for globe)
                // maxDistance: distance * 1609.34, spherical: true});
                console.log("dist used is ",ndistance);
            
        }
        
        // ... Other queries will go here ... 

        // Execute Query and Return the Query Results
        query.exec(function(err, events){
            console.log(maxDistance,events.length);
            if(err)
                res.send(err);

            // If no errors, respond with a JSON of all users that meet the criteria
            res.json(events);
        });
    });
};