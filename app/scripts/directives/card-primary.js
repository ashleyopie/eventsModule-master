'use strict';

angular.module('eventsAppApp')
    .directive('cardPrimary', function() {
        return {
            templateUrl: 'views/partials/card-primary.html',
            restrict: 'EA',
            replace: true
        };
    });