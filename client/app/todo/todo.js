//public/main.js

angular.module('todoApp', [])

.controller("todoController",['$scope', '$http', function($scope, $http) {
    $scope.formData = {};
    $scope.categories = [
        {name: 'Personal'},
        {name: 'Work'},
        {name: 'School'},
        {name: 'Cleaning'},
        {name: 'Other'}
    ];
    // $scope.selected = $scope.category.name;
    

            //  var eventData = {
            //     eventname: vm.updatedAt.eventname,
            //     eventtype: vm.formData.eventtype,
            //     duration: vm.formData.duration,
            //     mustdo: vm.formData.mustdo,
            //     location: [vm.formData.longitude, vm.formData.latitude],
            //     htmlverified: vm.formData.htmlverified
            // };
    // $scope.newTaskCategory = $scope.categories;
    // var category: $scope.newTaskCategory.name;
    // var todoData = {
    //             text: vm.newTask,
    //             createdAt: vm.newTaskDate,
    //             completed: false,
    //             category: vm.newTaskCategory.name
    //         };
     // when landing on the page, get all todos and show them
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
           var todoData = {
                text: $scope.formData.text,
                category: $scope.formData.category
            }; 


        $http.post('/api/todos', todoData)

            .success(function(data) {
                console.log("todoData.category is ",todoData.category);
            console.log("data is ",data);
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log("Data is ",data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.createEventTodo = function() {

           var todoData = {
                text: $scope.formData.text,
                category: $scope.formData.category
            };

            // Saves the event data to the db
            $http.post('/api/todos', todoData)
                .success(function (data) {
                    console.log('Success: ' + data);
                    $scope.formData.text = "";
                    $scope.formData.category = "";

                })
                .error(function (data) {
                    console.log('DB Event Error: ' + data);
                });
        };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}]);