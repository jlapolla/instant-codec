'use strict';

describe('Byte class', function() {

  // Skip test if Byte class is not exposed
  if (!TestModule.Byte) {

    return;
  }

  var byteA;
  var byteB;
  beforeEach(function() {

    byteA = new TestModule.Byte(0x99);
    byteB = new TestModule.Byte(0x96);
  });

  it('prototype.and() works', function() {

    expect(byteA.and(byteA).numericValue()).toBe(0x99);
    expect(byteA.and(byteB).numericValue()).toBe(0x90);
    expect(byteB.and(byteA).numericValue()).toBe(0x90);
    expect(byteB.and(byteB).numericValue()).toBe(0x96);
  });

  it('prototype.or() works', function() {

    expect(byteA.or(byteA).numericValue()).toBe(0x99);
    expect(byteA.or(byteB).numericValue()).toBe(0x9F);
    expect(byteB.or(byteA).numericValue()).toBe(0x9F);
    expect(byteB.or(byteB).numericValue()).toBe(0x96);
  });

  it('prototype.xor() works', function() {

    expect(byteA.xor(byteA).numericValue()).toBe(0x00);
    expect(byteA.xor(byteB).numericValue()).toBe(0x0F);
    expect(byteB.xor(byteA).numericValue()).toBe(0x0F);
    expect(byteB.xor(byteB).numericValue()).toBe(0x00);
  });

  it('prototype.not() works', function() {

    expect(byteA.not().numericValue()).toBe(0x66);
    expect(byteB.not().numericValue()).toBe(0x69);
  });

  it('prototype.leftShift() works', function() {

    expect(byteA.leftShift(4).numericValue()).toBe(0x90);
    expect(byteB.leftShift(4).numericValue()).toBe(0x60);
  });

  it('prototype.rightShift() works', function() {

    expect(byteA.rightShift(4).numericValue()).toBe(0x09);
    expect(byteB.rightShift(4).numericValue()).toBe(0x09);
  });

  it('prototype.numericValue() works', function() {

    expect(byteA.numericValue()).toBe(0x99);
    expect(byteB.numericValue()).toBe(0x96);
  });

  it('prototype.equalTo() works', function() {

    expect(byteA.equalTo(byteA)).toBe(true);
    expect(byteA.equalTo(byteB)).toBe(false);
    expect(byteB.equalTo(byteA)).toBe(false);
    expect(byteB.equalTo(byteB)).toBe(true);

    // Check when other instanceof Byte === false
    expect(byteA.equalTo({})).toBe(false);
    expect(byteB.equalTo({})).toBe(false);
  });

  it('prototype.toString() works', function() {

    expect(byteA.toString()).toBe('99');
    expect(byteB.toString()).toBe('96');
  });
});

