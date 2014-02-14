'use strict';

angular.module('eventsAppApp')
    .directive('starfooter', function() {
        return {
            templateUrl: 'views/footer.html',
            restrict: 'EA',
            replace: true
        };
    });