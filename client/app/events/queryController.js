/**
 * Created by pauljones on 12/11/15.
 */
(function () {

    var injectParams = ['$scope', '$http', '$rootScope', 'geolocation','gservice'];
    var queryController = function ($scope, $http, $rootScope, geolocation, gservice) {

        var vm = this;
        // Initializes Variables
        // ----------------------------------------------------------------------------
        //$scope.formData = {};
        vm.formData = {};
        var queryBody = {};
       

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

        
        // Take query parameters and incorporate into a JSON queryBody
        vm.queryEvents = function(){

            // Assemble Query Body
            queryBody = {
                longitude: parseFloat(vm.formData.longitude),
                latitude: parseFloat(vm.formData.latitude),
                distance: parseFloat(vm.formData.distance),
                accomodation: vm.formData.accomodation,
                themepark: vm.formData.themepark,
                city: vm.formData.city,
                minDuration: vm.formData.minDuration,
                maxDuration: vm.formData.maxDuration,
                mustdo: vm.formData.mustdo,
                reqVerified: vm.formData.verified
            };

            // Post the queryBody to the /query POST route to retrieve the filtered results
            $http.post('/query', queryBody)

                // Store the filtered results in queryResults
                .success(function(queryResults){
                    console.log('Map Query Success ' + queryResults);
                    // Pass the filtered results to the Google Map Service and refresh the map
                    gservice.refresh(queryBody.latitude, queryBody.longitude, queryResults);

                    // Count the number of records retrieved for the panel-footer
                    $scope.queryCount = queryResults.length;
                })
                .error(function(queryResults){
                    console.log('Map Query Error ' + queryResults);
                });
        };
       
    };

    queryController.$inject = injectParams;

    angular
        .module('cmiApp')
        .controller('queryController', queryController);

}());