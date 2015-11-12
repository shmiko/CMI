/**
 * Created by pauljones on 12/11/15.
 */
(function () {

    var injectParams = ['$scope', '$http', '$rootScope', 'geolocation','gservice'];
    var eventController = function ($scope, $http, $rootScope, geolocation, gservice) {

        var vm = this;
        // Initializes Variables
        // ----------------------------------------------------------------------------
        //$scope.formData = {};
        vm.formData = {};
        var coords = {};
        var lat = 0;
        var long = 0;

        // Set initial coordinates to the center of the US
        // $scope.formData.latitude = 39.500;
        // $scope.formData.longitude = -98.350;
        vm.formData.latitude = 39.500;
        vm.formData.longitude = -98.350;

        // Get User's actual coordinates based on HTML5 at window load
        geolocation.getLocation().then(function(data){

            // Set the latitude and longitude equal to the HTML5 coordinates
            coords = {lat:data.coords.latitude, long:data.coords.longitude};

            // Display coordinates in location textboxes rounded to three decimal points
            vm.formData.longitude = parseFloat(coords.long).toFixed(3);
            vm.formData.latitude = parseFloat(coords.lat).toFixed(3);

            // Display message confirming that the coordinates verified.
            vm.formData.htmlverified = "Yep (Thanks for giving us real data!)";

            gservice.refresh(vm.formData.latitude, vm.formData.longitude);

        });

        // Functions
        // ----------------------------------------------------------------------------
        // Get coordinates based on mouse click. When a click event is detected....
        $rootScope.$on("clicked", function(){

            // Run the gservice functions associated with identifying coordinates
            $scope.$apply(function(){
                vm.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
                vm.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
                vm.formData.htmlverified = "Nope (Thanks for spamming my map...)";
            });
        });
        // Creates a new event based on the form fields
        // Creates a new event based on the form fields
        //$scope.createUser = function() {
        vm.createEvent = function() {

            // Grabs all of the text box fields
            // var eventData = {
            //     eventname: $scope.formData.eventname,
            //     gender: $scope.formData.gender,
            //     age: $scope.formData.age,
            //     favlang: $scope.formData.favlang,
            //     place: [$scope.formData.longitude, $scope.formData.latitude],
            //     htmlverified: $scope.formData.htmlverified
            // };
            var eventData = {
                eventname: vm.formData.eventname,
                eventtype: vm.formData.eventtype,
                duration: vm.formData.duration,
                mustdo: vm.formData.mustdo,
                location: [vm.formData.longitude, vm.formData.latitude],
                htmlverified: vm.formData.htmlverified
            };

            // Saves the event data to the db
            $http.post('/events', eventData)
                .success(function (data) {

                    // Once complete, clear the form (except location)
                    // $scope.formData.eventname = "";
                    // $scope.formData.gender = "";
                    // $scope.formData.age = "";
                    // $scope.formData.favlang = "";
                    vm.formData.eventname = "";
                    vm.formData.eventtype = "";
                    vm.formData.duration = "";
                    vm.formData.mustdo = "";

                    // Refresh the map with new data
                    gservice.refresh(vm.formData.latitude, vm.formData.longitude);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };


        // createUser = function () {
        //     debugger
        //     // Grabs all of the text box fields
        //     var eventData = {
        //         eventname: vm.formData.eventname,
        //         gender: vm.formData.gender,
        //         age: vm.formData.age,
        //         favlang: vm.formData.favlang,
        //         place: [vm.formData.longitude, vm.formData.latitude],
        //         htmlverified: vm.formData.htmlverified
        //     };

        //     // Saves the event data to the db
        //     $http.post('/events', eventData)

        //         .success(function (data) {

        //             console.log('Success: ' + data);

        //             // Once complete, clear the form (except place)
        //             vm.formData.eventname = "";
        //             vm.formData.gender = "";
        //             vm.formData.age = "";
        //             vm.formData.favlang = "";

        //         })
        //         .error(function (data) {
        //             console.log('Error: ' + data);
        //         });
        // };
    };

    eventController.$inject = injectParams;

    angular
        .module('cmiApp')
        .controller('eventController', eventController);

}());