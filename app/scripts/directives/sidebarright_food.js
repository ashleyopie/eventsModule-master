'use strict';

angular.module('eventsAppApp')
    .directive('sidebarrightfood', function() {
        return {
            templateUrl: 'views/partials/sidebarrightfood.html',
            restrict: 'A',
            replace: true
        };
    });