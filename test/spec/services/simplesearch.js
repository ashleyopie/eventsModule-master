'use strict';

describe('Service: simplesearch', function () {

  // load the service's module
  beforeEach(module('eventsAppApp'));

  // instantiate service
  var simplesearch;
  beforeEach(inject(function (_simplesearch_) {
    simplesearch = _simplesearch_;
  }));

  it('should do something', function () {
    expect(!!simplesearch).toBe(true);
  });

});
