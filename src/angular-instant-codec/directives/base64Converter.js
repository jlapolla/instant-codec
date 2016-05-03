angularModule.directive('base64Converter', [
  function() {

    return {
      restrict: 'A',
      scope: {},
      controller: 'base64ConversionController',
    };
  },
]);

