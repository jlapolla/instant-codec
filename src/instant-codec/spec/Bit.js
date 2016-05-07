'use strict';

describe('Bit class', function() {

  // Skip test if Bit class is not exposed
  if (!TestModule.Bit) {

    return;
  }

  var bit0;
  var bit1;
  beforeEach(function() {

    bit0 = new TestModule.Bit(0);
    bit1 = new TestModule.Bit(1);
  })

  it('prototype.and() works', function() {

    // Test truth table for logical AND
    expect(bit0.and(bit0).booleanValue()).toBe(false);
    expect(bit0.and(bit1).booleanValue()).toBe(false);
    expect(bit1.and(bit0).booleanValue()).toBe(false);
    expect(bit1.and(bit1).booleanValue()).toBe(true);
  });

  it('prototype.or() works', function() {

    // Test truth table for logical OR
    expect(bit0.or(bit0).booleanValue()).toBe(false);
    expect(bit0.or(bit1).booleanValue()).toBe(true);
    expect(bit1.or(bit0).booleanValue()).toBe(true);
    expect(bit1.or(bit1).booleanValue()).toBe(true);
  });

  it('prototype.xor() works', function() {

    // Test truth table for logical XOR
    expect(bit0.xor(bit0).booleanValue()).toBe(false);
    expect(bit0.xor(bit1).booleanValue()).toBe(true);
    expect(bit1.xor(bit0).booleanValue()).toBe(true);
    expect(bit1.xor(bit1).booleanValue()).toBe(false);
  });

  it('prototype.not() works', function() {

    // Test truth table for logical NOT
    expect(bit0.not().booleanValue()).toBe(true);
    expect(bit1.not().booleanValue()).toBe(false);
  });

  it('prototype.booleanValue() works', function() {

    expect(bit0.booleanValue()).toBe(false);
    expect(bit1.booleanValue()).toBe(true);
  });

  it('prototype.numericValue() works', function() {

    expect(bit0.numericValue()).toBe(0);
    expect(bit1.numericValue()).toBe(1);
  });

  it('prototype.equalTo() works', function() {

    expect(bit0.equalTo(bit0)).toBe(true);
    expect(bit0.equalTo(bit1)).toBe(false);
    expect(bit1.equalTo(bit0)).toBe(false);
    expect(bit1.equalTo(bit1)).toBe(true);

    // Check when other instanceof Bit === false
    expect(bit0.equalTo({})).toBe(false);
    expect(bit1.equalTo({})).toBe(false);
  });

  it('prototype.toString() works', function() {

    expect(bit0.toString()).toBe('0');
    expect(bit1.toString()).toBe('1');
  });
});

