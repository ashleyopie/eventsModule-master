'use strict';

angular.module('eventsAppApp')
    .directive('weathercontrol', function() {
        return {
            templateUrl: 'views/partials/weather.html',
            restrict: 'EA',
            replace: true
        };
    });