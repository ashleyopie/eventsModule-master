'use strict';

describe('Controller: MapserviceCtrl', function () {

  // load the controller's module
  beforeEach(module('eventsAppApp'));

  var MapserviceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MapserviceCtrl = $controller('MapserviceCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
