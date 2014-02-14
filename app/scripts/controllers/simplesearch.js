'use strict';

angular.module('eventsAppApp')
    .controller('SimplesearchCtrl', function($scope, $timeout, pdAPItest) {

        $scope.search = function(params) {
            //console.log(params);
            pdAPItest.eventsKwLoc($scope.simple).success(function(data, status, headers) {
                $scope.events = data.data;
                console.log($scope.events);
            });
        }
    });