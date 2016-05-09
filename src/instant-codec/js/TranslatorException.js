this.TranslatorException = (function(Exception, extendClass) {

  function TranslatorException(message) {

    if (arguments.length > 0) {

      Exception.call(this, message);
    }
    else {

      Exception.call(this);
    }
  }

  extendClass(Exception, TranslatorException);
  var P = TranslatorException.prototype;

  P.name = 'TranslatorException';

  return TranslatorException;
}(this.Exception, this.extendClass));

