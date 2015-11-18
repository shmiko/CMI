/**
 * Created by pauljones on 13/11/15.
 */
(function () {
"use strict";

angular.module('cmiApp')
    .config(['$routeProvider', function ($routeProvider) {


        var routes = [
            {
               url: '/calendar',
               config: {
                   controller: 'calendarController',
                   templateUrl: '/app/calendar/calendar.html'
               }
            },
            {
               url: '/findevent',
               config: {
                    controller: 'queryController',
                    templateUrl: '/app/events/findEvent.html'
               }
            },
            {
                url: '/addevent',
                config: {
                    controller: 'eventController',
                    templateUrl: '/app/events/addEvent.html'

                }
            },
            {
                url: '/introduction',
                config: {
                    // controller: 'IntroductionController',
                    templateUrl: '/app/introduction/introduction.tmpl.html'
                    // controllerAs: 'vm'

                }
            },
            {
                url: '/intro',
                config: {
                    // controller: 'IntroductionController',
                    templateUrl: '/app/introduction/intro.html'
                    // controllerAs: 'vm'

                }
            },
            {
                url: '/itinerary',
                config: {
                    // controller: 'IntroductionController',
                    templateUrl: '/app/itinerary/itinerary.html'
                    // controllerAs: 'vm'

                }
            },
            {
                url: '/travel',
                config: {
                    // controller: 'IntroductionController',
                    templateUrl: '/app/travel/travel-cmi.html'
                    // controllerAs: 'vm'

                }
            },
            {
                url: '/hex',
                config: {
                    // controller: 'IntroductionController',
                    templateUrl: '/app/introduction/hexback.html'
                    // controllerAs: 'vm'

                }
            },
            {
                url: '/calmap',
                config:{
                    templateUrl: 'app/calmap/calmap.html',
                    controller: 'CalendarCtrl'
                }
            },
            {
                url: '/calmap/:eventId',
                config:{
                    templateUrl: 'app/calmap/event.html',
                    controller: 'EventCtrl'
                }
            },
            {
                url: '/forecast',
                config:{
                    templateUrl: 'app/weather/forecast.html',
                    controller: 'OpenWeatherCtrl'
                }
            },
            {
                url: '/storm',
                config:{
                    templateUrl: 'app/weather/storm.html',
                    controller: 'OpenWeatherCtrl'
                }
            }
        ];

       
        routes.forEach(function (route) {
            $routeProvider.when(route.url, route.config);
        });

        $routeProvider.otherwise({ redirectTo: '/intro' });
    }]);
    
   

})();