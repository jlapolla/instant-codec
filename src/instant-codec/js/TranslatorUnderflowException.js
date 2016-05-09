this.TranslatorUnderflowException = (function(TranslatorException, extendClass) {

  function TranslatorUnderflowException(message) {

    if (arguments.length > 0) {

      TranslatorException.call(this, message);
    }
    else {

      TranslatorException.call(this);
    }
  }

  extendClass(TranslatorException, TranslatorUnderflowException);
  var P = TranslatorUnderflowException.prototype;

  P.name = 'TranslatorUnderflowException';

  return TranslatorUnderflowException;
}(this.TranslatorException, this.extendClass));

