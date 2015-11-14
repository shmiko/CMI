/**
 * Created by pauljones on 13/11/15.
 */
(function () {
"use strict";

angular.module('cmiApp')
    .config(['$routeProvider', function ($routeProvider) {


        var routes = [
            //{
            //    url: '/adduser',
            //    config: {
            //        controller: 'userController',
            //        templateUrl: '/app/users/addUser.html'
            //    }
            //},
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
            }
            // ,
            // {
            //     url: '/findevent',
            //     config: {
            //         templateUrl: '/app/events/queryEvent.html'

            //     }
            // }
        ];
        routes.forEach(function (route) {
            $routeProvider.when(route.url, route.config);
        });

        $routeProvider.otherwise({ redirectTo: '/addevent' });
    }])
})();