// Code goes here
var app = angular.module('FeedApp', []);
app.controller("FeedController", ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=5&callback=JSON_CALLBACK&q=http://yosemiteblog.com/feed/').then(function (res) {
      //Your URL should immediately follow the q=
      //old url http://feeds.feedburner.com/crunchgear
        $scope.feeds = res.data.responseData.feed.entries;
        $scope.trustAsHtml = $sce.trustAsHtml;
        $scope.title = "Yosemite, Las Vegas, New York"
    });
}]);