'use strict';

describe('Controller: DiningcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('eventsAppApp'));

  var DiningcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DiningcontrollerCtrl = $controller('DiningcontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
