'use strict';

describe('TranslatorUnderflowException class', function() {

  // Skip test if TranslatorUnderflowException class is not exposed
  if (!TestModule.TranslatorUnderflowException) {

    return;
  }

  it('extends the TranslatorException class', function() {

    var ex = new TestModule.TranslatorUnderflowException();

    expect(ex instanceof TestModule.TranslatorException).toBe(true);
  });

  it('constructor accepts an optional message argument', function() {

    // TranslatorUnderflowException without message
    var ex = new TestModule.TranslatorUnderflowException();

    expect(ex instanceof TestModule.TranslatorException).toBe(true);
    expect(ex.name).toBe('TranslatorUnderflowException');
    expect(ex.message).toBe('');
    expect(ex.stack).not.toBeUndefined();

    // TranslatorUnderflowException with message
    var ex = new TestModule.TranslatorUnderflowException('abc');

    expect(ex instanceof TestModule.TranslatorException).toBe(true);
    expect(ex.name).toBe('TranslatorUnderflowException');
    expect(ex.message).toBe('abc');
    expect(ex.stack).not.toBeUndefined();
  });
});

