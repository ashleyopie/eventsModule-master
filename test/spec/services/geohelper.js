'use strict';

describe('Service: geoHelper', function () {

  // load the service's module
  beforeEach(module('eventsAppApp'));

  // instantiate service
  var geoHelper;
  beforeEach(inject(function (_geoHelper_) {
    geoHelper = _geoHelper_;
  }));

  it('should do something', function () {
    expect(!!geoHelper).toBe(true);
  });

});
