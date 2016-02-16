/**
 * Created by pauljones on 12/11/15.
 */
// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Creates a Event Schema. This will be the basis of how event data is stored in the db
var EventSchema = new Schema({
    eventname: {type: String, required: true},
    eventtype: {type: String, required: true},
    duration: {type: Number, required: true},
    mustdo: {type: String, required: true},
    location: {type: [Number], required: true}, // [Long, Lat]
    htmlverified: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

// Sets the created_at parameter equal to the current time
EventSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Indexes this schema in 2dsphere format (critical for running proximity searches)
//EventSchema.index({location: '2dsphere'});
EventSchema.index({location: '2dsphere'});

// Exports the EventSchema for use elsewhere. Sets the MongoDB collection to be used as: "cmi-events"
module.exports = mongoose.model('event', EventSchema); 