'use strict';

describe('Controller: BestbetscontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('eventsAppApp'));

  var BestbetscontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BestbetscontrollerCtrl = $controller('BestbetscontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
