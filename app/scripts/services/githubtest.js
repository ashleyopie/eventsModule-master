'use strict';

angular.module('eventsAppApp')
    .factory('githubTest', function($http) {
        // Service logic
        // ...

        var githubUrl = 'https://api.github.com';

        var runUserRequest = function(username, path) {
            return $http({
                method: 'JSONP',
                url: githubUrl + '/users/' +
                    username + '/' +
                    path + '?callback=JSON_CALLBACK'
            });
        };

        return {
            events: function(username) {
                return runUserRequest(username, 'events');
            }
        };
    });