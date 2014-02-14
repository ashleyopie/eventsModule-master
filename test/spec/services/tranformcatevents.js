'use strict';

describe('Service: tranformcatevents', function () {

  // load the service's module
  beforeEach(module('eventsAppApp'));

  // instantiate service
  var tranformcatevents;
  beforeEach(inject(function (_tranformcatevents_) {
    tranformcatevents = _tranformcatevents_;
  }));

  it('should do something', function () {
    expect(!!tranformcatevents).toBe(true);
  });

});
