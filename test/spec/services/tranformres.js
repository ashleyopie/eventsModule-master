'use strict';

describe('Service: tranformres', function () {

  // load the service's module
  beforeEach(module('eventsAppApp'));

  // instantiate service
  var tranformres;
  beforeEach(inject(function (_tranformres_) {
    tranformres = _tranformres_;
  }));

  it('should do something', function () {
    expect(!!tranformres).toBe(true);
  });

});
