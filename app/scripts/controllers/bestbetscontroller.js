'use strict';

angular.module('eventsAppApp')
    .controller('BestbetscontrollerCtrl', function($scope, pdAPItest, dateFixer) {
        pdAPItest.bestBets().success(function(data, status, headers) {
            $scope.events = dateFixer.fixDate(data.events);
            console.log($scope.events);
        });
    });