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

