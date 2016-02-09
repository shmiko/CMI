var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TodoSchema = new Schema({
    text: String,
    category: String,
    completed: Boolean,
    createdAt: Date,  
    updatedAt: Date,
});

module.exports = mongoose.model('todo', TodoSchema);