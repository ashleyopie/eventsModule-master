'use strict';

describe('Directive: hopeThisHeaderWorks', function () {

  // load the directive's module
  beforeEach(module('eventsAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<hope-this-header-works></hope-this-header-works>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the hopeThisHeaderWorks directive');
  }));
});
