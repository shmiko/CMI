angular.module("instagramApp", [])
    .filter('fromTo', function() {
        return function(input, from, total, lessThan) {
            from = parseInt(from);
            total = parseInt(total);
            for (var i = from; i < from + total && i < lessThan; i++) {
                input.push(i);
            }
            return input;
        }
    })
    .factory('instagram', ['$http',
        function($http) {
            return {
                fetchPopular: function(callback) {

                    var endPoint = "https://api.instagram.com/v1/media/popular?client_id=8d11693c54314da1acca39c219abf094&callback=JSON_CALLBACK";

                    $http.jsonp(endPoint).success(function(response) {
                        callback(response.data);
                    });
                }
            }
        }
    ])
    .controller("Example", function($scope, $interval, instagram) {
    $scope.fetch = 3;
      $scope.pics = [];
      $scope.have = [];
      $scope.orderBy = "-likes.count";
  $scope.orderBy = "";
      $scope.getMore = function() {
        instagram.fetchPopular(function(data) {
          var fetch = ($scope.fetch>data.length) ? date.length : $scope.fetch;
          $scope.fetch = fetch;
            for(var i=0; i<fetch; i++) {
              if (typeof $scope.have[data[i].id]==="undefined") {
                $scope.pics.unshift(data[i]) ;
                $scope.have[data[i].id] = "1";
              }
            }
        });
      };

      $scope.getMore();
      
        $scope.tags = [
            'Bootstrap', 'AngularJS', 'Instagram', 'Factory'
        ]
    });