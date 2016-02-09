/**
 * Created by pauljones on 12/11/15.
 */
(function () {
  'use strict';
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
      // "blog",
      // "registerApp"
      // "loginApp",
      // "logoutApp"
    ])
    ;

    
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

      app.factory('auth', ['$http', '$window', function($http, $window) {
        var auth = {};

        auth.saveToken = function(token) {
          $window.localStorage['flapper-news-token'] = token;
        };

        auth.getToken = function() {
          return $window.localStorage['flapper-news-token'];
        };

        auth.isLoggedIn = function() {
          var token = auth.getToken();
          if(token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
          } else {
            return false;
          }
        };

        auth.currentUser = function() {
          if(auth.isLoggedIn()) {
            var token = auth.getToken();
              var payload = JSON.parse($window.atob(token.split('.')[1]));

              return payload.username;
          }
        };

        auth.register = function(user) {
          return $http.post('./register', user).success(function(data){
            auth.saveToken(data.token);
          });
        };

        auth.logIn = function(user) {
          return $http.post('./login', user).success(function(data){
            auth.saveToken(data.token);
          });
        };

        auth.logOut = function() {
          $window.localStorage.removeItem('flapper-news-token');
        };


        return auth;
    }])

  app.factory('posts', ['$http', 'auth', function($http, auth) {
    var o = {
      posts: []
    };

    o.getAll = function() {
      return $http.get('/posts').success(function(data){
        angular.copy(data, o.posts);
      });
    };

    o.create = function(post) {
      return $http.post('/posts', post, {
        headers: {Authorization: 'Bearer ' + auth.getToken()}
      })
      .success(function(data){
        o.posts.push(data);
      });
    };

    o.upvote = function(post) {
      return $http.put('/posts/' + post._id + '/upvote', {
        headers: {Authorization: 'Bearer ' + auth.getToken()}
      }).success(function(data){
        post.upvotes++;
      });
    }

    o.get = function(id) {
      return $http.get('/posts/' + id).then(function(res){
        return res.data;
      });
    };

    o.addComment = function(id, comment) {
      return $http.post('/posts/' + id + '/comments', comment, {
        headers: {Authorization: 'Bearer ' + auth.getToken()}
      });
    };

    o.upvoteComment = function(post, comment) {
      return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', {
        headers: {Authorization: 'Bearer ' + auth.getToken()}
      })
      .success(function(data){
        comment.upvotes++;
      });
    };

    return o;
    }]);


app.controller('MainCtrl', [
    '$scope', 
    'posts', 
    'auth',
    function($scope, posts, auth){
      $scope.isLoggedIn = auth.isLoggedIn;
        $scope.posts = posts.posts;

      $scope.incrementUpvotes = function(post) {
        posts.upvote(post);
      }

      $scope.addPost = function(){
        if(!$scope.title || $scope.title === '') { return; }

        posts.create({
          title: $scope.title,
          link: $scope.link
        });

        $scope.title = '';
        $scope.link = '';
      }
    }
  ]);
app.controller('PostsCtrl', [
    '$scope',  
    'posts',
    'post',
    'auth',
    function($scope, posts, post, auth){
      $scope.isLoggedIn = auth.isLoggedIn;
      $scope.post = post;

      $scope.incrementUpvotes = function(comment) {
        posts.upvoteComment(post, comment);
      }

      $scope.addComment = function(){
        if($scope.body === '') { return; }
        posts.addComment(post._id, {
          body: $scope.body,
          author: 'user'
        }).success(function(comment){
          $scope.post.comments.push(comment);
        });

        $scope.body = '';
      }
    }
  ]);


app.controller('AuthCtrl', [
    '$scope',
    '$state',
    'auth',
    function($scope, $state, auth) {
      $scope.user = {};

      $scope.register = function() {
        auth.register($scope.user).error(function(error){
          $scope.error = error;
        }).then(function(){
          $state.go('home');
        });
      };

      $scope.logIn = function() {
        auth.logIn($scope.user).error(function(error){
          $scope.error = error;
        }).then(function(){
          $state.go('home');
        });
      };
    }
  ]);

app.controller('NavCtrl', [
    '$scope',
    'auth',
    function($scope, auth) {
      $scope.isLoggedIn = auth.isLoggedIn;
      $scope.currentUser = auth.currentUser;
      $scope.logOut = auth.logOut;
    }
  ]);

}());

