'use strict';

angular.module('eventsAppApp')
    .controller('BestbetssidebarCtrl', function($scope, pdAPItest, dateFixer) {
        pdAPItest.bestBets().success(function(data, status, headers) {
            $scope.events = dateFixer.fixDate(data.events);
            console.log('sidebar');
            console.log(data.events);
        });
    });