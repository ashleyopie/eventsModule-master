'use strict';

describe('Directive: starFooter', function () {

  // load the directive's module
  beforeEach(module('eventsAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<star-footer></star-footer>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the starFooter directive');
  }));
});
