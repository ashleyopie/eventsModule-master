'use strict';

describe('Filter: eventAttributes', function () {

  // load the filter's module
  beforeEach(module('eventsAppApp'));

  // initialize a new instance of the filter before each test
  var eventAttributes;
  beforeEach(inject(function ($filter) {
    eventAttributes = $filter('eventAttributes');
  }));

  it('should return the input prefixed with "eventAttributes filter:"', function () {
    var text = 'angularjs';
    expect(eventAttributes(text)).toBe('eventAttributes filter: ' + text);
  });

});
