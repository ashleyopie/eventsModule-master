'use strict';

angular.module('eventsAppApp')
    .directive('cardining', function() {
        return {
            templateUrl: 'views/partials/card-dining.html',
            restrict: 'EA',
            replace: true
        };
    });