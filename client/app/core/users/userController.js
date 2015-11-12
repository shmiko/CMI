/**
 * Created by pauljones on 12/11/15.
 */
(function () {

    var injectParams = ['$scope', '$http', 'geolocation'];
    var userController = function ($scope, $http, geolocation) {

        var vm = this;
        // Initializes Variables
        // ----------------------------------------------------------------------------
        vm.formData = {};
        var coords = {};
        var lat = 0;
        var long = 0;

        // Set initial coordinates to the center of the US
        vm.formData.latitude = 39.500;
        vm.formData.longitude = -98.350;

        // Functions
        // ----------------------------------------------------------------------------
        // Creates a new user based on the form fields
        vm.createUser = function () {

            // Grabs all of the text box fields
            var userData = {
                username: vm.formData.username,
                gender: vm.formData.gender,
                age: vm.formData.age,
                favlang: vm.formData.favlang,
                place: [vm.formData.longitude, vm.formData.latitude],
                htmlverified: vm.formData.htmlverified
            };

            // Saves the user data to the db
            $http.post('/users', userData)
                .success(function (data) {
                    console.log('Success: ' + data);
                    // Once complete, clear the form (except place)
                    vm.formData.username = "";
                    vm.formData.gender = "";
                    vm.formData.age = "";
                    vm.formData.favlang = "";

                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };
    };

    userController.$inject = injectParams;

    angular
        .module('cmiApp')
        .controller('userController', userController);

}());