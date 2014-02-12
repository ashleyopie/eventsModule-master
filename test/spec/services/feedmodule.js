'use strict';

describe('Service: feedmodule', function () {

  // load the service's module
  beforeEach(module('eventsAppApp'));

  // instantiate service
  var feedmodule;
  beforeEach(inject(function (_feedmodule_) {
    feedmodule = _feedmodule_;
  }));

  it('should do something', function () {
    expect(!!feedmodule).toBe(true);
  });

});
