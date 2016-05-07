'use strict';

describe('getUndefined function', function() {

  // Skip test if getUndefined is not exposed
  if (!TestModule.getUndefined) {

    return;
  }

  it('returns the primitive value "undefined"', function() {

    expect(TestModule.getUndefined()).toBeUndefined();
  });
});

