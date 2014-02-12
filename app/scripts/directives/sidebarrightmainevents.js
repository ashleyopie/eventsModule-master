'use strict';

angular.module('eventsAppApp')
    .directive('sidebarrightmainevents', function() {
        return {
            templateUrl: 'views/partials/sidebarrighthome.html',
            restrict: 'EA',
            replace: true
        };
    });