// Code goes here
var app = angular.module('FeedApp', []);
app.controller("FeedController", ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=http://feeds2.feedburner.com/Mashable').then(function (res) {
      //Your URL should immediately follow the q=
      //old url http://feeds.feedburner.com/crunchgear
        $scope.feeds = res.data.responseData.feed.entries;
        $scope.trustAsHtml = $sce.trustAsHtml;
    });
}]);