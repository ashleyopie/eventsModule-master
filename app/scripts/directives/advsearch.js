 'use strict';

 angular.module('eventsAppApp')
     .directive('advsearch', function() {
         return {
             templateUrl: 'views/partials/search_cont.html',
             restrict: 'A',
             replace: true
         };
     });