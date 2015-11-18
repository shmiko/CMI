'use strict';

/* Controllers */

var googleCalControllers = angular.module('googleCalControllers', []);

googleCalControllers.controller('BaseCtrl', ['$scope', 'config',
    function($scope, config) {
        var dateTime = new Date();
        $scope.calConfig = config;
        $scope.dateTime = dateTime.toISOString();
        $scope.date = dateTime.toDateString();
    }
]);

googleCalControllers.controller('CalendarCtrl', ['$scope', '$http', '$controller', 'config',
    function($scope, $http, $controller, config) {
        $controller('BaseCtrl', { $scope: $scope });

        /* Set defaults */
        $scope.showDetails = null;
        $scope.calID = config.calendars[0].id;

        $scope.updateCal = function() {
            /* Will allow future updating of the calendar ID by user interaction */
            var url = getCalUrl($scope.calID, config);

            $http.get(url, {cache: true})
            .success(function(data) {
                $scope.title = data.summary;
                $scope.description = data.description;
                $scope.events = data.items;
                $scope.calItems = config.options.perPage;
                /* Some sort of confirmation? */
            })
            .error(function() {
                alert("Could not find the specified calendar");
            });
        }

        // GCal Helper Methods
        $scope.insertCalendarEvent = function(title, startTime, endTime, callback) {
            console.log('inserting event');
            console.log('start: '+startTime);
            console.log('end: '+endTime);
            calendar.events.insert({
                auth:oAuthClient,
                calendarId: googleConfig.calendarId,
                resource: {
                    'start': {
                        dateTime: startTime,
                        timeZone: "America/New_York"
                    },
                    'end': {
                        dateTime: endTime,
                        timeZone: "America/New_York"
                    },
                    'summary': title
                }
            }, function(err, eventObj) {
                if(err) {
                    console.log('Error: '+err);
                } else {
                    console.log('Success: '+eventObj);
                    callback(eventObj);
                }
            });
        };

        /* Display the calendar */
        $scope.updateCal();

        $scope.getEndDate = function(event) {
            if(event.end.date) {
                var date = new Date(event.end.date);
            } else {
                var date = new Date(event.end.dateTime);
            }
            return date.toDateString();
        }

        $scope.showMoreItems = function() {
            $scope.calItems += config.options.perPage;
        }

        $scope.toggleDetails = function(id) {

            $scope.showDetails = null;
            console.log("location is ",$scope.events[id].location);
            console.log("color is ",$scope.events[id].ColorId);
            // if the event has a location, but no lat or lng, look up it's location by address
            if($scope.events[id].location && !$scope.events[id].lat && !$scope.events[id].lng) {

                var GeoCodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.events[id].location;

                // get the location. cache the result to prevent over-use
                $http.get(GeoCodeURL, {'cache': true})
                .success(function(data) {
                    // update the event object with the geo data
                    $scope.events[id].formatted_address = data.results[0].formatted_address;
                    $scope.events[id].lat = data.results[0].geometry.location.lat;
                    $scope.events[id].lng = data.results[0].geometry.location.lng;
                })
                .error(function(data) {
                    // what to do if the google API is not available or an API error occurs?
                })
                .then(function() {
                    $scope.showDetails = id;
                });
            }
        }
    }
]);
