'use strict';

angular.module('eventsAppApp')
    .directive('smallinput', function() {
        return {
            templateUrl: 'views/partials/smallinput.html',
            restrict: 'A',
            replace: true,
            link: function postLink(scope, element, attrs) {

            }
        };
    });