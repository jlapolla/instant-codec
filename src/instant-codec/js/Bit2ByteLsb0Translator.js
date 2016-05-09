this.Bit2ByteLsb0Translator = (function(
  Byte,
  Array,
  TranslatorOverflowException,
  TranslatorUnderflowException) {

  var bufferLength = 8;

  var output = function(buffer) {

    var intValue = 0;
    var shiftValue = 1;
    for (var i = 0; i < bufferLength; i++) {

      if (buffer[i].booleanValue()) {

        intValue = intValue | shiftValue;
      }

      shiftValue = shiftValue << 1;
    }

    return [new Byte(intValue)];
  };

  function Bit2ByteLsb0Translator() {

    this._buffer = new Array(bufferLength);
    this._bufferIndex = 0;
  };

  Bit2ByteLsb0Translator.prototype = {};
  var P = Bit2ByteLsb0Translator.prototype;

  P.put = function(bit) {

    if (this.canPut()) {

      this._buffer[this._bufferIndex] = bit;
      this._bufferIndex = this._bufferIndex + 1;
    }
    else {

      throw new TranslatorOverflowException('Cannot convert more than ' + bufferLength + ' Bits to a Byte.');
    }
  };

  P.peek = function() {

    if (this.canPeek()) {

      return output(this._buffer);
    }
    else {

      throw new TranslatorUnderflowException('Cannot convert less than ' + bufferLength + ' Bits to a Byte.');
    }
  };

  P.clear = function() {

    this._bufferIndex = 0;
  };

  P.canPut = function() {

    return this._bufferIndex !== bufferLength;
  };

  P.canPeek = function() {

    return this._bufferIndex === bufferLength;
  };

  return Bit2ByteLsb0Translator;
}(this.Byte,
  host.Array,
  this.TranslatorOverflowException,
  this.TranslatorUnderflowException));

