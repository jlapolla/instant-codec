this.Byte = (function() {

  var hex = '0123456789ABCDEF'.split('');

  function Byte(intValue) {

    this._numericValue = intValue & 0xFF;
  }

  Byte.prototype = {};
  var P = Byte.prototype;

  P.and = function(other) {

    return new Byte(this.numericValue() & other.numericValue());
  };

  P.or = function(other) {

    return new Byte(this.numericValue() | other.numericValue());
  };

  P.xor = function(other) {

    return new Byte(this.numericValue() ^ other.numericValue());
  };

  P.not = function() {

    return new Byte(~this.numericValue());
  };

  P.leftShift = function(count) {

    return new Byte(this.numericValue() << count);
  };

  P.rightShift = function(count) {

    return new Byte(this.numericValue() >>> count);
  };

  P.numericValue = function() {

    return this._numericValue;
  };

  P.equalTo = function(other) {

    return other instanceof Byte
      && other.numericValue() === this.numericValue();
  };

  P.toString = function() {

    return [
      hex[this.numericValue() >>> 4],
      hex[this.numericValue() & 0xF],
    ].join('');
  };

  return Byte;
}());

