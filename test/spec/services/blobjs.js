'use strict';

describe('Service: blobjs', function () {

  // load the service's module
  beforeEach(module('eventsAppApp'));

  // instantiate service
  var blobjs;
  beforeEach(inject(function (_blobjs_) {
    blobjs = _blobjs_;
  }));

  it('should do something', function () {
    expect(!!blobjs).toBe(true);
  });

});
