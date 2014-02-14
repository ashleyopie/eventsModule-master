'use strict';

angular.module('eventsAppApp')
    .controller('EventsListController', function($scope, pdAPItest, dateFixer, defaultImages, searchQuery) {
        $scope.master = {};

        pdAPItest.events().success(function(data, status, headers) {
            //fix dates to standard js Date format
            $scope.events = dateFixer.fixDate(data.events);
            //add default images
            //get pagination
            $scope.next = data.summary.nextPage;
        });

        searchQuery.getCategories('events').success(function(data, status, header) {
            $scope.queryCategories = data.categories;
            console.log(data.categories);
        });

        $scope.search = function(params) {
            pdAPItest.eventsKwLoc($scope.simple, $scope.queryCategories).success(function(data, status, headers) {
                $scope.events = dateFixer.fixDate(data.events);
                $scope.next = data.summary.nextPage;
                //console.log($scope.next);
            });
        }

        $scope.reset = function() {
            $scope.simple = angular.copy($scope.master);
            pdAPItest.events().success(function(data, status, headers) {
                //fix dates to standard js Date format
                $scope.events = dateFixer.fixDate(data.events);
                //add default images
                //get pagination
                $scope.next = data.summary.nextPage;
            });
        }

        $scope.nextPage = function() {
            pdAPItest.getNext($scope.next).success(function(data, status, headers) {
                $scope.events = dateFixer.fixDate(data.events);
                $scope.next = data.summary.nextPage;
            });
        }
    });