'use strict';

describe('getUndefined function', function() {

  var module = InstantCodec;

  // Skip test if getUndefined is not exposed
  if (!module.getUndefined) {

    return;
  }

  it('returns the primitive value "undefined"', function() {

    expect(module.getUndefined()).toBeUndefined();
  });
});

