'use strict';

describe('Controller: FeedmoduleCtrl', function () {

  // load the controller's module
  beforeEach(module('eventsAppApp'));

  var FeedmoduleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FeedmoduleCtrl = $controller('FeedmoduleCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
