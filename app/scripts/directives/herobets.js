'use strict';

angular.module('eventsAppApp')
    .directive('herobets', function($parse) {
        return {
            templateUrl: 'views/partials/hero_bets.html',
            restrict: 'EA',
            replace: true
        }
    });