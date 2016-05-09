'use strict';

describe('TranslatorException class', function() {

  // Skip test if TranslatorException class is not exposed
  if (!TestModule.TranslatorException) {

    return;
  }

  it('extends the TestModule.Exception class', function() {

    var ex = new TestModule.TranslatorException();

    expect(ex instanceof TestModule.Exception).toBe(true);
  });

  it('constructor accepts an optional message argument', function() {

    // TranslatorException without message
    var ex = new TestModule.TranslatorException();

    expect(ex instanceof TestModule.Exception).toBe(true);
    expect(ex.name).toBe('TranslatorException');
    expect(ex.message).toBe('');
    expect(ex.stack).not.toBeUndefined();

    // TranslatorException with message
    var ex = new TestModule.TranslatorException('abc');

    expect(ex instanceof TestModule.Exception).toBe(true);
    expect(ex.name).toBe('TranslatorException');
    expect(ex.message).toBe('abc');
    expect(ex.stack).not.toBeUndefined();
  });
});

