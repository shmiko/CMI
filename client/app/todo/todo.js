//public/main.js

angular.module('todoApp', ['ngMaterial'])

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
}])

.config(function($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.definePalette('amazingPaletteName', {
    '50': 'ffebee',
    '100': 'ffcdd2',
    '200': 'ef9a9a',
    '300': 'e57373',
    '400': 'ef5350',
    '500': 'f44336',
    '600': 'e53935',
    '700': 'd32f2f',
    '800': 'c62828',
    '900': 'b71c1c',
    'A100': 'ff8a80',
    'A200': 'ff5252',
    'A400': 'ff1744',
    'A700': 'd50000',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light
    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });
  $mdThemingProvider.theme('calmapit-dark','default')
    .primaryPalette('amazingPaletteName')
    .dark();
  });




