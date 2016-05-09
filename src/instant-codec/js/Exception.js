/**
 * Refer to:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
 */

this.Exception = (function(Error, extendClass) {

  function Exception(message) {

    if (arguments.length > 0) {

      this.message = message;
    }

    this.stack = (new Error()).stack;
  }

  extendClass(Error, Exception);
  var P = Exception.prototype;

  P.name = 'Exception';

  return Exception;
}(host.Error, this.extendClass));

