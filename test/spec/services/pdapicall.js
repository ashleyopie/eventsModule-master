'use strict';

describe('Service: pdAPICall', function () {

  // load the service's module
  beforeEach(module('eventsAppApp'));

  // instantiate service
  var pdAPICall;
  beforeEach(inject(function (_pdAPICall_) {
    pdAPICall = _pdAPICall_;
  }));

  it('should do something', function () {
    expect(!!pdAPICall).toBe(true);
  });

});
