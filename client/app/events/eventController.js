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
        var queryBody = {};
        var coords = {};
        var lat = 0;
        var long = 0;

        // Set initial coordinates to the center of the US
        // $scope.formData.latitude = 39.500;
        // $scope.formData.longitude = -98.350;
        //40.6700, -73.9400 New York
        vm.formData.latitude = 40.6700;
        vm.formData.longitude = -73.9400;

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
                    console.log('DB Event OK: ' + vm.formData.latitude, vm.formData.longitude);
                })
                .error(function (data) {
                    console.log('DB Event Error: ' + data);
                });
        };

        // Take query parameters and incorporate into a JSON queryBody
        vm.queryEvents = function(){

            // Assemble Query Body
            queryBody = {
                longitude: parseFloat($scope.formData.longitude),
                latitude: parseFloat($scope.formData.latitude),
                distance: parseFloat($scope.formData.distance),
                eventtype: $scope.formData.eventtype,
                // themepark: $scope.formData.themepark,
                // city: $scope.formData.city,
                minDuration: $scope.formData.minDuration,
                maxDuration: $scope.formData.maxDuration,
                mustdo: $scope.formData.mustdo,
                reqVerified: $scope.formData.verified
            };

            // Post the queryBody to the /query POST route to retrieve the filtered results
            $http.post('/query', queryBody)

                // Store the filtered results in queryResults
                .success(function(queryResults){
                    console.log('Success ' + queryResults);
                    // Pass the filtered results to the Google Map Service and refresh the map
                    gservice.refresh(queryBody.latitude, queryBody.longitude, queryResults);

                    // Count the number of records retrieved for the panel-footer
                    $scope.queryCount = queryResults.length;
                })
                .error(function(queryResults){
                    console.log('Error ' + queryResults);
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