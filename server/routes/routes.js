/**
 * Created by pauljones on 12/11/15.
 */
// Dependencies
var mongoose        = require('mongoose');
var User            = require('../models/user.js');

// Opens App Routes
module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db
    app.get('/users', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = User.find({});
        query.exec(function(err, users){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all users
            res.json(users);
        });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new users in the db
    app.post('/users', function(req, res){
        var parseBody = JSON.parse(req.body);
        console.log("req data is ", req.body);
        // Creates a new User based on the Mongoose schema and the post bo.dy
        var newuser = new User(parseBody);
        // var newuser = new User({
        //     username: req.body.username,
        //     gender: req.body.gender,
        //     age: req.body.age,
        //     favlang: req.body.favlang,
        //     location: req.body.place
        // });
        console.log("newuser parsed data is ", parseBody);
        // New User is saved in the db.
        newuser.save(function(err){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new user
            res.parseBody;
        });
    });
};