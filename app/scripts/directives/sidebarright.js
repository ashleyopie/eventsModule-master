'use strict';

angular.module('eventsAppApp')
    .directive('sidebarright', function() {
        return {
            templateUrl: 'views/partials/sidebarright.html',
            restrict: 'EA',
            replace: true
        };
    });