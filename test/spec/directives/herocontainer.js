'use strict';

describe('Directive: heroContainer', function () {

  // load the directive's module
  beforeEach(module('eventsAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<hero-container></hero-container>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the heroContainer directive');
  }));
});
