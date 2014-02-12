'use strict';

angular.module('eventsAppApp')
    .directive('herocontainer', function($parse) {
        return {
            templateUrl: 'views/partials/hero.html',
            restrict: 'EA',
            replace: true
        }
    });