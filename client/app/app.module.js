/**
 * Created by pauljones on 12/11/15.
 */
(function () {
    // Declares the initial angular module. Module grabs other controllers and services.
    var app = angular.module('cmiApp', [
		'ngRoute',
		'geolocation',
		'gservice',
		'calendarDemoApp',
		'googleCalControllers',
		'ngMap',
		'ngAnimate',
    'openWeatherApp.filters',
    'openWeatherApp.services',
    'openWeatherApp.directives',
    'openWeatherApp.controllers',
    "iso-3166-country-codes",
    // "blogApp",
    "todoApp",
    "instagramApp",
    "bloggerApp",
    "ngMaterial",
    "MyApp"
    ]);

     app.constant('config', {
        'calendars': [
          {
              'name': 'USA',
              'id':   '15dcnca6hga2rqna9f651qc5d0@group.calendar.google.com'
          }
        ],
        'apiKeys': {
          'calendar': 'AIzaSyCejMVWTWZgaoHrfj_vyYQnI0WlAZOQaGk',
          'maps':     'AIzaSyCDyuMEpvjNHZS8ACf1rJPhxMOODrfJyL4'
        },
        'options': {
          'perPage':          40,
          'dateFormat':       'd MMMM yyyy',
          'dateTimeFormat':   'h:mm a d MMMM yyyy'
        }
    });

}());