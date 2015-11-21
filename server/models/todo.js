var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TodoSchema = new Schema({
	text: {
		type: String,
		default: '',
		trim: true,
		required: "Title can't be blank"
	}
});
mongoose.model('todo', TodoSchema);