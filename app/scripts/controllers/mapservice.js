'use strict';

angular.module('eventsAppApp')
    .controller('MapserviceCtrl', function($scope, geoHelper) {
        console.log($scope.$parent.events);

        //geoHelper.getGeoCenter($scope.$parent.events.events[0].listing);

    });