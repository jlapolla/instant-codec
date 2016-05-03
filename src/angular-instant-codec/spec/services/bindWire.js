'use strict';

describe('bindWire service', function() {

  beforeEach(module('instant-codec'));

  var bind;
  var wireFactory;
  var scopeFactory;
  beforeEach(inject([
    'bindWire',
    'refWire',
    '$rootScope',
    function(bindWire, refWire, $rootScope) {

      bind = bindWire;
      wireFactory = refWire;
      scopeFactory = function() {

        return $rootScope.$new(false);
      };
    }]));

  it('binds a wire value to an Angular $scope', function() {

    // Create wire and $scope
    var wire = wireFactory();
    var $scope = scopeFactory();

    // Create check function
    var check = function(value) {

      // Check wire and scope properties
      expect(wire.value()).toBe(value);
      expect($scope.simple).toBe(value);
      expect($scope.nested.object.value).toBe(value);
    };

    // Initialize $scope properties
    $scope.simple = wire.value();
    $scope.nested = {
      object: {
        value: wire.value(),
      },
    };

    // Bind wire to $scope properties. Notice we save the returned "unbind"
    // functions.
    var unbindSimple = bind(wire, $scope, 'simple');
    var unbindNested = bind(wire, $scope, 'nested.object.value');

    // Initial check for all properties undefined (using an anonymous function
    // which returns the "undefined" primitive)
    check((function() {}()));

    // Set value on wire
    wire.value('abc');

    // Check all properties for 'abc'
    check('abc');

    // Set value on $scope
    $scope.nested.object.value = 123;
    $scope.$apply();

    // Check all properties for 123
    check(123);

    // Unbind the nested property
    unbindNested();

    // Set value on wire
    wire.value('abc');

    // Check all properties
    expect(wire.value()).toBe('abc');
    expect($scope.simple).toBe('abc');
    expect($scope.nested.object.value).toBe(123); // Not bound

    // Set value on unbound $scope property
    $scope.nested.object.value = 'unbound';
    $scope.$apply();

    // Check all properties
    expect(wire.value()).toBe('abc');
    expect($scope.simple).toBe('abc');
    expect($scope.nested.object.value).toBe('unbound'); // Not bound

    // Destroy scope (should unbind everything)
    $scope.$destroy();

    // Set value on wire
    wire.value(123);

    // Check all properties
    expect(wire.value()).toBe(123);
    expect($scope.simple).toBe('abc'); // Not bound
    expect($scope.nested.object.value).toBe('unbound'); // Not bound
  });
});

