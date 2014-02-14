'use strict';

angular.module('eventsAppApp')
    .directive('cardlisting', function() {
        return {
            templateUrl: 'views/partials/card-listing.html',
            restrict: 'EA',
            replace: true
        };
    });