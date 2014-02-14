'use strict';

describe('Controller: VenuedetailCtrl', function () {

  // load the controller's module
  beforeEach(module('eventsAppApp'));

  var VenuedetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VenuedetailCtrl = $controller('VenuedetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
