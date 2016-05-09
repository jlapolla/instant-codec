'use strict';

describe('Bit2ByteLsb0Translator class', function() {

  // Skip test if Bit2ByteLsb0Translator class is not exposed
  if (!TestModule.Bit2ByteLsb0Translator) {

    return;
  }

  var bit0;
  var bit1;
  var translator;
  beforeEach(function() {

    bit0 = new TestModule.Bit(0);
    bit1 = new TestModule.Bit(1);
    translator = new TestModule.Bit2ByteLsb0Translator();
  });

  it('translates Bits to Bytes using LSB 0 bit numbering', function() {

    // Reusable translate and check function
    var check = function(buffer, numericValue) {

      for (var i = 0; i < buffer.length; i++) {

        expect(translator.canPut()).toBe(true);
        expect(translator.canPeek()).toBe(false);
        translator.put(buffer[i]);
      }

      expect(translator.canPut()).toBe(false);
      expect(translator.canPeek()).toBe(true);
      expect(translator.peek().length).toBe(1);
      expect(translator.peek()[0].numericValue()).toBe(numericValue);
    };

    /*
     * First byte
     */
    var buffer = [bit0, bit1, bit1, bit0, bit1, bit0, bit0, bit1];
    check(buffer, 0x96);

    /*
     * Second byte
     */
    translator.clear();
    buffer = [bit1, bit0, bit1, bit0, bit0, bit1, bit0, bit1];
    check(buffer, 0xA5);
  });

  it('throws TranslatorOverflowException', function() {

    for (var i = 0; i < 8; i++) {

      translator.put(bit0);
    }

    var threw = false;
    try {

      translator.put(bit0);
    }
    catch (ex) {

      threw = true;
      expect(ex instanceof TestModule.TranslatorOverflowException).toBe(true);
      expect(ex.message).toBe('Cannot convert more than 8 Bits to a Byte.');
    }
    expect(threw).toBe(true);
  });

  it('throws TranslatorUnderflowException', function() {

    var threw = false;
    try {

      translator.peek();
    }
    catch (ex) {

      threw = true;
      expect(ex instanceof TestModule.TranslatorUnderflowException).toBe(true);
      expect(ex.message).toBe('Cannot convert less than 8 Bits to a Byte.');
    }
    expect(threw).toBe(true);
  });
});

