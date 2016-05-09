'use strict';

describe('Exception class', function() {

  // Skip test if Exception class is not exposed
  if (!TestModule.Exception) {

    return;
  }

  it('extends the native JavaScript Error class', function() {

    var ex = new TestModule.Exception();

    expect(ex instanceof Error).toBe(true);
  });

  it('constructor accepts an optional message argument', function() {

    // Exception without message
    var ex = new TestModule.Exception();

    expect(ex instanceof Error).toBe(true);
    expect(ex.name).toBe('Exception');
    expect(ex.message).toBe('');
    expect(ex.stack).not.toBeUndefined();

    // Exception with message
    var ex = new TestModule.Exception('abc');

    expect(ex instanceof Error).toBe(true);
    expect(ex.name).toBe('Exception');
    expect(ex.message).toBe('abc');
    expect(ex.stack).not.toBeUndefined();
  });
});

