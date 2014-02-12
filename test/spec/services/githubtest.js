'use strict';

describe('Service: githubTest', function () {

  // load the service's module
  beforeEach(module('eventsAppApp'));

  // instantiate service
  var githubTest;
  beforeEach(inject(function (_githubTest_) {
    githubTest = _githubTest_;
  }));

  it('should do something', function () {
    expect(!!githubTest).toBe(true);
  });

});
