'use strict';

angular.module('eventsAppApp')
    .directive('mainEventView', function() {
        return {
            templateUrl: 'views/maineventviewtemplate.html',
            restrict: 'E',
            controller: 'EventsListController',
            link: function postLink(scope, element, attrs) {
                element.text('this is the mainEventView directive');
            }
        };
    });