'use strict';

describe('Service: dateFixer', function () {

  // load the service's module
  beforeEach(module('eventsAppApp'));

  // instantiate service
  var dateFixer;
  beforeEach(inject(function (_dateFixer_) {
    dateFixer = _dateFixer_;
  }));

  it('should do something', function () {
    expect(!!dateFixer).toBe(true);
  });

});
