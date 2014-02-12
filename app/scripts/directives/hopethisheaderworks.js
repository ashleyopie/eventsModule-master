'use strict';

angular.module('eventsAppApp')
    .directive('starheader', function() {
        return {
            templateUrl: 'views/header.html',
            restrict: 'E',
            replace: true
        };
    });