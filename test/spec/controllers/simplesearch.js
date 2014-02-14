'use strict';

describe('Controller: SimplesearchCtrl', function () {

  // load the controller's module
  beforeEach(module('eventsAppApp'));

  var SimplesearchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SimplesearchCtrl = $controller('SimplesearchCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
