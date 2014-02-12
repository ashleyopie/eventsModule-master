'use strict';

describe('Service: tranformresTypedetector', function () {

  // load the service's module
  beforeEach(module('eventsAppApp'));

  // instantiate service
  var tranformresTypedetector;
  beforeEach(inject(function (_tranformresTypedetector_) {
    tranformresTypedetector = _tranformresTypedetector_;
  }));

  it('should do something', function () {
    expect(!!tranformresTypedetector).toBe(true);
  });

});
