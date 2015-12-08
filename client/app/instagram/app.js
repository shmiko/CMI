angular.module('instagram', ['ngAnimate'])
    .controller('searchCtrl', ['$scope', '$q', '$http',
        function($scope, $q, $http) {

            function emptyImageData() {
                $scope.imageData = {
                    imageUrl: [],
                    instagramUrl: []
                };
                return $scope.imageData;
            }

            $scope.loadMsg = false;
            $scope.errorMsg = false;
            //$scope.data.search_text = 'calmapit';

            function parseCallback(result) {
                $scope.loadMsg = false;
                for (var i = 0; i < 20; i++) {
                    $scope.imageData.imageUrl.push(result.data[i].images.low_resolution
                        .url);
                    $scope.imageData.instagramUrl.push(result.data[i].link);
                }
            }

            $scope.searchInstagram = function(userInput) {
                emptyImageData();
                $scope.data.queryValue = userInput || 'calmapit';
                $scope.data.search_text = null;
                $scope.loadMsg = true;
                var url = "https://api.instagram.com/v1/tags/" + userInput +
                    "/media/recent";
                var request = {
                    callback: "JSON_CALLBACK",
                    client_id: "8d11693c54314da1acca39c219abf094"
                };

                $http({
                        method: 'JSONP',
                        url: url,
                        params: request
                    })
                    .success(function(result) {
                        console.log("result is ", result);
                        parseCallback(result);
                    })
                    .error(function() {
                        $scope.loadMsg = false;
                        $scope.successMsg = false;
                        $scope.errorMsg = true;
                    });
            };
        }
    ]);