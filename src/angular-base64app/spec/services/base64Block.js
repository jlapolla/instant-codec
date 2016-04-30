'use strict';

describe('base64Block service', function() {

  beforeEach(module('base64app'));

  var block;
  var wireFactory;
  beforeEach(inject([
    'base64Block',
    'refWire',
    function(base64Block, refWire) {

      block = base64Block();
      wireFactory = refWire;
    }]));

  it('creates a block that syncs utf8, base64, and base64Stripped', function() {

    // Create wires
    var utf8 = wireFactory();
    var base64 = wireFactory();
    var stripped = wireFactory();

    // Connect wires
    block.connect('utf8', utf8);
    block.connect('base64', base64);
    block.connect('base64Stripped', stripped);

    // Clear function
    var clear = function() {

      // Clear circuit
      utf8.value('');
      base64.value('');
      stripped.value('');
    };

    // Create valid states
    var states = [
      {utf8: '', base64: '', stripped: ''},
      {utf8: '小飼弾', base64: '5bCP6aO85by+', stripped: '5bCP6aO85by+'},
      {
        utf8: 'I ♥ base64',
        base64: 'SSDimaUgYmFzZTY0',
        stripped: 'SSDimaUgYmFzZTY0'},
      {utf8: 'I ♥ U', base64: 'SSDimaUgVQ==', stripped: 'SSDimaUgVQ'},
    ];

    // Check valid states
    for (var i = 0; i < states.length; i++) {

      var st = states[i];
      var check = function() {

        // Check circuit
        expect(block.error()).toBeUndefined();
        expect(utf8.value()).toBe(st.utf8);
        expect(base64.value()).toBe(st.base64);
        expect(stripped.value()).toBe(st.stripped);
      };

      // Set utf8
      clear();
      utf8.value(st.utf8);
      check();

      // Set base64
      clear();
      base64.value(st.base64);
      check();

      // Set stripped
      clear();
      stripped.value(st.stripped);
      check();
    }
  });
});

