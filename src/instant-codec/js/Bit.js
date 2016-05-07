/**
 * # Abstract Data Type Specification
 *
 * ## Types
 *
 * Bit
 *
 * ## Description
 *
 * Represents a binary digit. A Bit is immutable.
 *
 * ## Functions
 *
 * - and: Bit × Bit --> Bit
 * - or: Bit × Bit --> Bit
 * - xor: Bit × Bit --> Bit
 * - not: Bit --> Bit
 * - booleanValue: Bit --> BOOLEAN
 * - numericValue: Bit --> INTEGER
 * - equalTo: Bit × Bit --> BOOLEAN
 * - toString: Bit --> STRING
 */

this.Bit = (function() {

  function Bit(intValue) {

    if (intValue === 0) {

      this._booleanValue = false;
    }
    else {

      this._booleanValue = true;
    }
  }

  Bit.prototype = {};
  var P = Bit.prototype;

  P.and = function(other) {

    if (other.booleanValue() && this.booleanValue()) {

      return new Bit(1);
    }
    else {

      return new Bit(0);
    }
  };

  P.or = function(other) {

    if (other.booleanValue() || this.booleanValue()) {

      return new Bit(1);
    }
    else {

      return new Bit(0);
    }
  };

  P.xor = function(other) {

    if (this.booleanValue() === other.booleanValue()) {

      return new Bit(0);
    }
    else {

      return new Bit(1);
    }
  };

  P.not = function() {

    if (this.booleanValue()) {

      return new Bit(0);
    }
    else {

      return new Bit(1);
    }
  };

  P.booleanValue = function() {

    return this._booleanValue;
  };

  P.numericValue = function() {

    if (this.booleanValue()) {

      return 1;
    }
    else {

      return 0;
    }
  };

  P.equalTo = function(other) {

    return other instanceof Bit
      && other.booleanValue() === this.booleanValue();
  };

  P.toString = function() {

    if (this.booleanValue()) {

      return '1';
    }
    else {

      return '0';
    }
  };

  return Bit;
}());

