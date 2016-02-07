// angular.module('logoutApp').controller('logoutController',
//   ['$scope', '$location', 'AuthService',
//   function ($scope, $location, AuthService) {

//     $scope.logout = function () {

//       console.log(AuthService.getUserStatus());

//       // call logout from service
//       AuthService.logout()
//         .then(function () {
//           $location.path('/login');
//         });

//     };

// }]);

(function() {
    'use strict';
  angular
      .module('logoutApp',['$scope', '$location', 'AuthService'])
      .controller('logoutController', LogoutCtrl);

      function LogoutCtrl($scope, $location, AuthService) {
          $scope.logout = function () {

          console.log(AuthService.getUserStatus());

          // call logout from service
          AuthService.logout()
            .then(function () {
              $location.path('/login');
            });

        };
      } 
})();