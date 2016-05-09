this.TranslatorOverflowException = (function(TranslatorException, extendClass) {

  function TranslatorOverflowException(message) {

    if (arguments.length > 0) {

      TranslatorException.call(this, message);
    }
    else {

      TranslatorException.call(this);
    }
  }

  extendClass(TranslatorException, TranslatorOverflowException);
  var P = TranslatorOverflowException.prototype;

  P.name = 'TranslatorOverflowException';

  return TranslatorOverflowException;
}(this.TranslatorException, this.extendClass));

