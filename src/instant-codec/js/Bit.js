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
 * - booleanValue: Bit --> BOOLEAN
 * - equalTo: Bit × Bit --> BOOLEAN
 * - not: Bit --> Bit
 * - numericValue: Bit --> INTEGER
 * - or: Bit × Bit --> Bit
 * - toString: Bit --> STRING
 * - Bit: INTEGER --> Bit
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

  P.numericValue = function() {

    if (this.booleanValue()) {

      return 1;
    }
    else {

      return 0;
    }
  };

  P.booleanValue = function() {

    return this._booleanValue;
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

  P.not = function() {

    if (this.booleanValue()) {

      return new Bit(0);
    }
    else {

      return new Bit(1);
    }
  };

  return Bit;
}());

