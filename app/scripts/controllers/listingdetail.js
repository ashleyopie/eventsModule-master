'use strict';

angular.module('eventsAppApp')
    .controller('ListingdetailctrlCtrl', function($scope, $routeParams, $modal, pdAPItest) {
        pdAPItest.listing($routeParams.listingId).success(function(data, status, headers) {
            $scope.listings = data;
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