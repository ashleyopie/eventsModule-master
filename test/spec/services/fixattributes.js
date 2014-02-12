'use strict';

describe('Service: fixAttributes', function () {

  // load the service's module
  beforeEach(module('eventsAppApp'));

  // instantiate service
  var fixAttributes;
  beforeEach(inject(function (_fixAttributes_) {
    fixAttributes = _fixAttributes_;
  }));

  it('should do something', function () {
    expect(!!fixAttributes).toBe(true);
  });

});
