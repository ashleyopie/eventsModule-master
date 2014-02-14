'use strict';

describe('Service: pdAPICall2', function () {

  // load the service's module
  beforeEach(module('eventsAppApp'));

  // instantiate service
  var pdAPICall2;
  beforeEach(inject(function (_pdAPICall2_) {
    pdAPICall2 = _pdAPICall2_;
  }));

  it('should do something', function () {
    expect(!!pdAPICall2).toBe(true);
  });

});
