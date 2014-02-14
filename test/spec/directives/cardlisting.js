'use strict';

describe('Directive: cardlisting', function () {

  // load the directive's module
  beforeEach(module('eventsAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cardlisting></cardlisting>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the cardlisting directive');
  }));
});
