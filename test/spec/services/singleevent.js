'use strict';

describe('Service: singleevent', function () {

  // load the service's module
  beforeEach(module('eventsAppApp'));

  // instantiate service
  var singleevent;
  beforeEach(inject(function (_singleevent_) {
    singleevent = _singleevent_;
  }));

  it('should do something', function () {
    expect(!!singleevent).toBe(true);
  });

});
