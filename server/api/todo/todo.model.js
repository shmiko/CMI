// define model =================
var Todo = mongoose.model('Todo', {
    text: String,
    category: String,
    completed: Boolean,
    createdAt: Date,  
    updatedAt: Date,
});