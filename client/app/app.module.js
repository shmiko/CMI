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
    "mdapp",
    "todoApp",
    // "instagramApp",
    "bloggerApp",
    "ngMaterial",
    "MyApp",
    "StarterApp",
    "RSSFeedApp",
    "FeedApp",
    "Wikipedia",
    "gamesApp",
    "ba3-angularmaterial-googlemaps-location",
    "ngMdIcons",
    "ngMap",
    "instagram"
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
          'perPage':          10,
          'dateFormat':       'd MMMM yyyy',
          'dateTimeFormat':   'h:mm a d MMMM yyyy'
        }
    })

     app.config(function($mdThemingProvider) {
        // Configure a dark theme with primary foreground yellow
        $mdThemingProvider.definePalette('amazingPaletteName', { 
        '50': 'ffebee',
        '100': 'ffcdd2',
        '200': 'ef9a9a',
        '300': 'e57373',
        '400': 'ef5350',
        '500': 'f44336',
        '600': 'e53935',
        '700': 'd32f2f',
        '800': 'c62828',
        '900': 'b71c1c',
        'A100': 'ff8a80',
        'A200': 'ff5252',
        'A400': 'ff1744',
        'A700': 'd50000',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
         '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
      });
      $mdThemingProvider.definePalette('validusPrimaryPalette', {
        '50': '80cae0',
        '100': '6cc1db',
        '200': '57b9d6',
        '300': '43b0d1',
        '400': '31a6c9',
        '500': '2c95b5',
        '600': '2784a0',
        '700': '22738c',
        '800': '1d6277',
        '900': '185163',
        'A100': '95d2e5',
        'A200': 'a9dbea',
        'A400': 'bee4ef',
        'A700': '13414e',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
        'contrastLightColors': undefined
      });
      $mdThemingProvider.theme('calmapit')
        .primaryPalette('amazingPaletteName')
        //.accentPalette('pink');
        .dark();
       $mdThemingProvider.theme('aqua')
        .primaryPalette('validusPrimaryPalette')
        //.accentPalette('pink');
        .dark(); 
       $mdThemingProvider.theme('altTheme','default')
        .primaryPalette('deep-purple')
        .accentPalette('indigo'); 
      });

      app.directive('scrollOnClick', function() {
        return {
          restrict: 'A',
          link: function(scope, $elm, attrs) {
            var idToScroll = attrs.href;
            $elm.on('click', function() {
              var $target;
              if (idToScroll) {
                $target = $(idToScroll);
              } else {
                $target = $elm;
              }
              $("body").animate({scrollTop: $target.offset().top}, "slow");
            });
          }
        }
      });

}());

