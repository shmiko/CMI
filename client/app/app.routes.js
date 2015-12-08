/**
 * Created by pauljones on 13/11/15.
 */
(function () {
"use strict";

angular.module('cmiApp')
    .config(['$stateProvider','$httpProvider','$routeProvider','$urlRouterProvider', function ($stateProvider,$httpProvider,$routeProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise('/intro');

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
                url: '/form',
                config: {
                    // controller: 'IntroductionController',
                    templateUrl: '/app/form/form.html'
                    // controllerAs: 'vm'
                }
            },
            {
                url: '/form_md',
                config: {
                    // controller: 'IntroductionController',
                    templateUrl: '/app/form/form_md.html',
                    controller: 'AppController'
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
            },
            {
                url: '/blog',
                config:{
                    templateUrl: 'app/blog/blog.html',
                    controller: 'BlogController'
                }
            },
            {
                url: '/todo',
                config:{
                    templateUrl: 'app/todo/todo.html',
                    controller: 'todoController'
                }
            },
            {
                url: '/instagram',
                config:{
                    templateUrl: 'app/instagram/instagram.html',
                    controller: 'Example'
                }
            }
  
        ];
        $stateProvider

            .state('posts',{
                url:'/posts',
                templateUrl : 'app/blogger/pages/blog.html',
                controller  : 'bloggerController'
            })

            .state('post',{
                url:'/post/:id',
                templateUrl : 'app/blogger/pages/post.html',
                controller  : 'postsController'
            })
            // .state('instagram',{
            //     url:'/instagram',
            //     templateUrl : 'app/instagram/instagram.html',
            //     controller  : 'Example'
            // })
            .state('todo',{
                url:'/todo',
                templateUrl : 'app/todo/todo.html',
                controller  : 'todoController'
            })
            .state('forecast',{
                url:'/forecast',
                templateUrl : 'app/weather/forecast.html',
                controller  : 'OpenWeatherCtrl'
            })
            .state('event',{
                url:'/calmap/:eventId',
                templateUrl : 'app/calmap/event.html',
                controller  : 'EventCtrl'
            })
            .state('calmap',{
                url:'/calmap',
                templateUrl : 'app/calmap/calmap.html',
                controller  : 'CalendarCtrl'
            })
            .state('form',{
                url:'/form',
                templateUrl : 'app/form/form.html'
            })
            .state('form_md',{
                url:'/form_md',
                templateUrl : 'app/form/form_md.html'
            })
            .state('travel',{
                url:'/travel',
                templateUrl : 'app/travel/travel-cmi.html'
            })

            .state('itinerary',{
                url:'/itinerary',
                templateUrl : 'app/itinerary/itinerary.html'
            })
            .state('intro',{
                url:'/intro',
                templateUrl : 'app/introduction/intro.html'
            })
            .state('introduction',{
                url:'/introduction',
                templateUrl : 'app/introduction/introduction.tmpl.html'
            })
            .state('atlas',{
                url:'/atlas',
                templateUrl : 'app/atlas/atlas.html'
            })
            .state('addevent',{
                url:'/addevent',
                templateUrl : 'app/events/addEvent.html',
                controller: 'eventController'
            })
            .state('findevent',{
                url:'/findevent',
                templateUrl : 'app/events/findEvent.html',
                controller: 'queryController'
            })
            .state('calendar',{
                url:'/calendar',
                templateUrl : 'app/calendar/calendar.html',
                controller: 'calendarController'
            })
            .state('cd',{
                url:'/cd',
                templateUrl : 'app/todo/cd.html',
                controller: 'todoController'
            })
            .state('sidebar-right',{
                url:'/sidebar-right',
                templateUrl : 'app/core/sidebar/sidebar-right.html'
            })
            .state('sidebar-left',{
                url:'/sidebar-left',
                templateUrl : 'app/core/sidebar/sidebar-left.html'
            })
            .state('rss',{
                url:'/rss',
                templateUrl : 'app/rss/rss.html',
                controller: 'FeedController'
            })
            .state('rss2',{
                url:'/rss2',
                templateUrl : 'app/rss/rss2.html',
                controller: 'FeedCtrl'
            })
            .state('wikipedia',{
                url:'/wikipedia',
                templateUrl : 'app/wikipedia/wikipedia.html',
                controller: 'wikiCtrl'
            })
            .state('games',{
                url:'/games',
                templateUrl : 'app/games/games.html',
                controller: 'gamesCtrl'
            })
            .state('quiz',{
                url:'/quiz',
                templateUrl : 'app/games/quiz.html'
            })
            .state('twitter',{
                url:'/twitter',
                templateUrl : 'app/twitter/twitter.html'
            })
            .state('maps',{
                url:'/maps',
                templateUrl : 'app/maps/maps.html',
                controller: 'PrincipalController'
            })
            .state('directions',{
                url:'/directions',
                templateUrl : 'app/maps/directions.html',
                controller: 'directionsController'
            })
            .state('gallery',{
                url:'/gallery',
                templateUrl : 'app/gallery/gallery.html'
                //controller: 'galleryCtrl'
            })
            .state('instagram',{
                url:'/instagram',
                templateUrl : 'app/instagram/index.html',
                controller: "searchCtrl"
            })
            .state('home',{
                url:'/',
                templateUrl : 'app/introduction/intro.html'
            })
            ;
       
        routes.forEach(function (route) {
            $routeProvider.when(route.url, route.config);
        });

        $routeProvider.otherwise({ redirectTo: '/travel' });
    }]);
    
   

})();