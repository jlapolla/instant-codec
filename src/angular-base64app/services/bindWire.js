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

