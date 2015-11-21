/**
 * Created by pauljones on 12/11/15.
 */
// Dependencies
var mongoose        = require('mongoose');
//var User            = require('../models/user.js');
// var Event            = require('../models/event.js');
//var Todo            = require('../models/todo.js');

 // define model =================
    var Todo = mongoose.model('Todo', {
        text : String
    });
    
// Opens App Routes
module.exports = function(app) {


app.get('/api/todos', function(req, res) {				// GET de todos los TODOs
	Todo.find(function(err, todos) {
		if(err) {
			res.send(err);
		}
		res.json(todos);
	});
});

app.post('/api/todos', function(req, res) {				// POST que crea un TODO y devuelve todos tras la creación
	Todo.create({
		text: req.body.text,
		done: false
	}, function(err, todo){
		if(err) {
			res.send(err);
		}

		Todo.find(function(err, todos) {
			if(err){
				res.send(err);
			}
			res.json(todos);
		});
	});
});

app.delete('/api/todos/:todo', function(req, res) {		// DELETE un TODO específico y devuelve todos tras borrarlo.
	Todo.remove({
		_id: req.params.todo
	}, function(err, todo) {
		if(err){
			res.send(err);
		}

		Todo.find(function(err, todos) {
			if(err){
				res.send(err);
			}
			res.json(todos);
		});

	})
});
};