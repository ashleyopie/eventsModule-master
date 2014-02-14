'use strict';

describe('Controller: GithubuserCtrl', function () {

  // load the controller's module
  beforeEach(module('eventsAppApp'));

  var GithubuserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GithubuserCtrl = $controller('GithubuserCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
