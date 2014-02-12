'use strict';

angular.module('eventsAppApp')
    .controller('ListingcontrollerCtrl', function($scope, pdAPItest) {
        pdAPItest.listings().success(function(data, status, headers) {
            $scope.listings = data.listings;
            console.log(data.listings);
        });
    });