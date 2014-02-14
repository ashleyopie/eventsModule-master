'use strict';

angular.module('eventsAppApp')
    .controller('GithubuserCtrl', function($scope, $timeout, githubTest) {
        var timeout;
        $scope.$watch('username', function(newUsername) {
            if (newUsername) {
                if (timeout) $timeout.cancel(timeout);
                timeout = $timeout(function() {
                    githubTest.events(newUsername).success(function(data, status, headers) {
                        $scope.events = data.data;
                    });
                }, 350); //timeout in ms    
            }
        });
    });