'use strict';

describe('Controller: EventreviewCtrl', function () {

  // load the controller's module
  beforeEach(module('eventsAppApp'));

  var EventreviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventreviewCtrl = $controller('EventreviewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
