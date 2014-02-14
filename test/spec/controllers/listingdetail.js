'use strict';

describe('Controller: ListingdetailctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('eventsAppApp'));

  var ListingdetailctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListingdetailctrlCtrl = $controller('ListingdetailctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
