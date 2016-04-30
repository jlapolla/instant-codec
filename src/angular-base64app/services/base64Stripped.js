angularModule.constant('base64Stripped', (function() {

  var encode = function(base64) {

    return base64.split('=', 1)[0];
  };

  var decode = function(base64Stripped) {

    // If base64Stripped.length % 4 === 1, then the encoded string is not
    // valid. However, this function assumes that the input argument is valid.

    var arr = [];
    if (base64Stripped.length % 4 !== 0) {

      arr.length = 5 - base64Stripped.length % 4;
    }
    return base64Stripped + arr.join('=');
  };

  return {
    encode: encode,
    decode: decode,
  };
}()));

