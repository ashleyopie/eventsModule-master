'use strict';

describe('Controller: BestbetssidebarCtrl', function () {

  // load the controller's module
  beforeEach(module('eventsAppApp'));

  var BestbetssidebarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BestbetssidebarCtrl = $controller('BestbetssidebarCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
