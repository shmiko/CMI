/**
 * Created by pauljones on 12/11/15.
 */
(function () {

    // Declares the initial angular module "meanMapApp". Module grabs other controllers and services.
    var app = angular.module('cmiApp', [
        'ngRoute',
        'geolocation'
    ]);

    //app.config(['$routeProvider', function ($routeProvider) {
    //    var viewBase = 'client';
    //
    //    $routeProvider
    //        .when('/', {
    //            controller: 'usersController',
    //            templateUrl: viewBase + '/index.html',
    //            controllerAs: 'vm'
    //        })
    //
    //        .otherwise({ redirectTo: '/' });
    //
    //}]);

}());