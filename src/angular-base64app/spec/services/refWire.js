'use strict';

describe('refWire service', function() {

  beforeEach(module('base64app'));

  var refWire;
  beforeEach(inject(['refWire', function(refWireInjected) {

    refWire = refWireInjected;
  }]));

  it('creates a regular LiveBlocks.Wire', function() {

    expect(refWire() instanceof LiveBlocks.Wire).toBe(true);
    expect(refWire().equalTo).toBe((new LiveBlocks.Wire).equalTo);
    expect(refWire()).not.toBe(refWire());
  });
});

