/**
 * Created by pauljones on 12/11/15.
 */
 var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TodoSchema = new Schema({
	title: {
		type: String,
		default: '',
		trim: true,
		required: "Title can't be blank"
	}
});
mongoose.model('todo', TodoSchema);
