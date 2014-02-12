'use strict';

angular.module('eventsAppApp')
    .directive('sidebarrightevents', function() {
        return {
            templateUrl: 'views/partials/sidebarrightevents.html',
            restrict: 'EA',
            replace: true
        };
    });