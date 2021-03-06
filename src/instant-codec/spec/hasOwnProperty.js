'use strict';

describe('hasOwnProperty function', function() {

  var module = InstantCodec;

  // Skip test if hasOwnProperty is not exposed
  if (!{}.hasOwnProperty.call(module, 'hasOwnProperty')) {

    return;
  }

  it('returns true for an objects "own" properties', function() {

    // Make an object
    var object = {a: 0};
    expect(module.hasOwnProperty(object, 'a')).toBe(true);
  });

  it('returns false for inherited and undefined properties', function() {

    // Make a class
    function MyClass() {}

    MyClass.prototype = {a: 0};

    // Make an instance of the class
    var object = new MyClass();
    expect(object.a).toBe(0);
    expect(module.hasOwnProperty(object, 'a')).toBe(false);
    expect(module.hasOwnProperty(object, 'b')).toBe(false);
  });
});

