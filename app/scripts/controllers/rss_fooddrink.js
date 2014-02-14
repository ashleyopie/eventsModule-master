'use strict';

angular.module('eventsAppApp')
    .controller('RssFooddrinkCtrl', function($scope, feedmodule) {

        $scope.url = "http://rssfeeds.indystar.com/indystar/foodanddrink";

        feedmodule.parseFeed($scope.url).then(function(res) {
            $scope.feed = res.data.responseData.feed.entries;
            //console.log($scope.feed);
            angular.forEach($scope.feed, function(key, value) {
                key.publishedDate = new Date(key.publishedDate);
                //console.log(key.publishedDate);
            });
        });
    });