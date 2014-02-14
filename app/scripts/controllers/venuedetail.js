'use strict';

angular.module('eventsAppApp')
    .controller('VenuedetailCtrl', function($scope, $routeParams, $modal, singleevent, dateFixer, fixAttributes ) {
        //console.log($routeParams.eventId);
        singleevent.listings($routeParams.listingId).success(function(data, status, headers) {
            $scope.events = fixAttributes.fixAttrib(data.listings[0]);

            console.log(data.listings[0]);
        });

        singleevent.listingEvents($routeParams.listingId).success(function(data, status, headers) {
            $scope.upcomingEvents = dateFixer.fixDate(data.events);
            //console.log(data);
        });

        $scope.open = function() {

            var modalInstance = $modal.open({
                templateUrl: 'views/partials/eventview.html',
                controller: 'ModalInstanceControl',
                scope: $scope

            });
            console.log('modal opened');
            modalInstance.result.then(function() {
                console.log($scope.selected);
            }, function() {
                console.log('modal dismissed at: ' + new Date());
            });
        }


    });