'use strict';

angular.module('eventsAppApp')
    .controller('ModalInstanceControl', function($scope, $modalInstance, event) {

        $scope.event = event;

        $scope.ok = function() {
            $modalInstance.close();
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });