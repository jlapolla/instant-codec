'use strict';

describe('TranslatorOverflowException class', function() {

  // Skip test if TranslatorOverflowException class is not exposed
  if (!TestModule.TranslatorOverflowException) {

    return;
  }

  it('extends the TranslatorException class', function() {

    var ex = new TestModule.TranslatorOverflowException();

    expect(ex instanceof TestModule.TranslatorException).toBe(true);
  });

  it('constructor accepts an optional message argument', function() {

    // TranslatorOverflowException without message
    var ex = new TestModule.TranslatorOverflowException();

    expect(ex instanceof TestModule.TranslatorException).toBe(true);
    expect(ex.name).toBe('TranslatorOverflowException');
    expect(ex.message).toBe('');
    expect(ex.stack).not.toBeUndefined();

    // TranslatorOverflowException with message
    var ex = new TestModule.TranslatorOverflowException('abc');

    expect(ex instanceof TestModule.TranslatorException).toBe(true);
    expect(ex.name).toBe('TranslatorOverflowException');
    expect(ex.message).toBe('abc');
    expect(ex.stack).not.toBeUndefined();
  });
});

