'use strict';

describe('Directive: sidebarright', function () {

  // load the directive's module
  beforeEach(module('eventsAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sidebarright></sidebarright>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the sidebarright directive');
  }));
});
