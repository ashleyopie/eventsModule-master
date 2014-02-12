'use strict';

describe('Service: createindexed', function () {

  // load the service's module
  beforeEach(module('eventsAppApp'));

  // instantiate service
  var createindexed;
  beforeEach(inject(function (_createindexed_) {
    createindexed = _createindexed_;
  }));

  it('should do something', function () {
    expect(!!createindexed).toBe(true);
  });

});
