'use strict';

angular.module('eventsAppApp')
  .filter('eventAttributes', function () {
    return function (input) {
      return 'eventAttributes filter: ' + input;
    };
  });
