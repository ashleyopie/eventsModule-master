'use strict';

angular.module('eventsAppApp')
    .directive('sidebar', function() {
        return {
            templateUrl: 'views/partials/sidebar.html',
            restrict: 'A',
            replace: true
        };
    });