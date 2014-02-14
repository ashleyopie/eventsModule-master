'use strict';

describe('Service: filesaverjs', function () {

  // load the service's module
  beforeEach(module('eventsAppApp'));

  // instantiate service
  var filesaverjs;
  beforeEach(inject(function (_filesaverjs_) {
    filesaverjs = _filesaverjs_;
  }));

  it('should do something', function () {
    expect(!!filesaverjs).toBe(true);
  });

});
