/**
 * Created by pauljones on 12/11/15.
 */
// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var bcrypt      = require('bcrypt-nodejs');
var Schema      = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// Creates a User Schema. This will be the basis of how user data is stored in the db
var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    // gender: {type: String, required: true},
    // age: {type: Number, required: true},
    // favlang: {type: String, required: true},
    // location: {type: [Number], required: true}, // [Long, Lat]
    // htmlverified: String,
    // history:[{
    //     date: Date,
    //     paid: { type: Number, default: 0},
    //     item: { type: Schema.Types.ObjectId, ref: ''}
    // }],
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});


// decalre a new user
// var user = new User();
// user.email = "";
// user.username = "Paul";



// Hash the password before we save it to the db
UserSchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err,salt){
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if (err) return next(err);
            user.password = hash;
            next();
        })
    });
    // next();
});

// Sets the created_at parameter equal to the current time
UserSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Indexes this schema in 2dsphere format (critical for running proximity searches)
UserSchema.index({location: '2dsphere'});

// Compare password in the db to what the user types in
UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

UserSchema.plugin(passportLocalMongoose);

// Exports the UserSchema for use elsewhere. Sets the MongoDB collection to be used as: "cmi-users"
module.exports = mongoose.model('user', UserSchema);







