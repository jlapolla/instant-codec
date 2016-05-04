/**
 * Instant Codec 0.1.0 Angular module
 * https://github.com/jlapolla/instant-codec
 *
 * Copyright (c) 2016 Justin LaPolla
 * Released under the MIT license
 */

'use strict';

(function() {

  var angularModule = angular.module('instant-codec', ['ab-base64']);

(function() {

  var Base64ConversionController = (function() {

    var undef = (function() {}());

    function Base64ConversionController(
      $scope,
      blockFactory,
      wireFactory,
      bind) {

      // Create block
      var block = blockFactory();

      // Create wires
      var wire = {
        utf8: wireFactory(),
        base64: wireFactory(),
        base64Stripped: wireFactory(),
      };

      // Connect wires to block
      block.connect('utf8', wire.utf8);
      block.connect('base64', wire.base64);
      block.connect('base64Stripped', wire.base64Stripped);

      // Bind wires to $scope
      for (var name in wire) {

        bind(wire[name], $scope, name);
      }

      // Set initial value
      wire.utf8.value('Enter text here!');

      // Bound functions on $scope
      $scope.isGood = this.isGood.bind(this);
      $scope.error = this.error.bind(this);

      // Circular $scope reference (for the "dot rule")
      $scope.scope = $scope;

      // Collect private properties
      this._block = block;
    };

    Base64ConversionController.prototype = {};
    var P = Base64ConversionController.prototype;

    P.isGood = function() {

      return this._block.error() === undef;
    };

    P.error = function() {

      return this._block.error();
    };

    return Base64ConversionController;
  }());

  angularModule.controller('base64ConversionController', [
    '$scope',
    'base64Block',
    'refWire',
    'bindWire',
    Base64ConversionController,
  ]);
}());

angularModule.directive('base64Converter', [
  function() {

    return {
      restrict: 'A',
      scope: {},
      controller: 'base64ConversionController',
    };
  },
]);

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

angularModule.constant('bindWire', function(wire, $scope, property) {

  var propertyChain = property.split('.');

  // Create wire listener function
  var listener = function(value) {

    // Set value on object at the end of the property chain
    var object = $scope;
    for (var i = 0; i < propertyChain.length; i++) {

      if (i < propertyChain.length - 1) {

        // Move down object tree
        object = object[propertyChain[i]];
      }
      else {

        // Set value on object
        object[propertyChain[i]] = value;
      }
    }

    // This function is not responsible for calling $scope.$apply()
  };

  // Change scope property when wire value changes
  wire.on('value', listener);

  // Change wire value when scope property changes
  var unwatch = $scope.$watch(property, function(value) {

    // Set value on wire
    wire.value(value);
  });

  // Create unbind function
  var unbind = function() {

    unwatch();
    wire.off('value', listener);
  };

  // Automatically unbind on $scope.$destroy()
  $scope.$on('$destroy', unbind);

  // Return unbind function
  return unbind;
});

angularModule.constant('refWire', function() {

  return new LiveBlocks.Wire();
});

}());

