'use strict';

describe('Directive: weathercontrol', function () {

  // load the directive's module
  beforeEach(module('eventsAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<weathercontrol></weathercontrol>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the weathercontrol directive');
  }));
});
