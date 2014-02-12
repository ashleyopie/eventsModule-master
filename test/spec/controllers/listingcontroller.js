'use strict';

describe('Controller: ListingcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('eventsAppApp'));

  var ListingcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListingcontrollerCtrl = $controller('ListingcontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
