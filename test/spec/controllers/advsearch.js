'use strict';

describe('Controller: AdvsearchCtrl', function () {

  // load the controller's module
  beforeEach(module('eventsAppApp'));

  var AdvsearchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdvsearchCtrl = $controller('AdvsearchCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
