'use strict';

describe('Service: defaultImages', function () {

  // load the service's module
  beforeEach(module('eventsAppApp'));

  // instantiate service
  var defaultImages;
  beforeEach(inject(function (_defaultImages_) {
    defaultImages = _defaultImages_;
  }));

  it('should do something', function () {
    expect(!!defaultImages).toBe(true);
  });

});
