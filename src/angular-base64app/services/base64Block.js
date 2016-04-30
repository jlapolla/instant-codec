angularModule.factory('base64Block', [
  'base64',
  'base64Stripped',
  function(codec, strippedCodec) {

    var fromUtf8 = function(input, output) {

      output.base64 = codec.encode(input.utf8);
      output.base64Stripped = strippedCodec.encode(output.base64);
    };

    var fromBase64 = function(input, output) {

      output.utf8 = codec.decode(input.base64);
      output.base64Stripped = strippedCodec.encode(input.base64);
    };

    var fromBase64Stripped = function(input, output) {

      output.base64 = strippedCodec.decode(input.base64Stripped);
      output.utf8 = codec.decode(output.base64);
    };

    return function() {

      return new LiveBlocks.ImmediateBlock({
        pins: {
          utf8: fromUtf8,
          base64: fromBase64,
          base64Stripped: fromBase64Stripped,
        },
      });
    };
  },
]);

