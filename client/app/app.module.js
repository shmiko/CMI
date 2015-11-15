/**
 * Created by pauljones on 12/11/15.
 */
(function () {
    // Declares the initial angular module. Module grabs other controllers and services.
    var app = angular.module('cmiApp', [
        'ngRoute',
        'geolocation',
        'gservice',
        'calendarDemoApp'
    ]);
}());