/**
 * Instant Codec 0.1.0
 * https://github.com/jlapolla/instant-codec
 *
 * Copyright (c) 2016 Justin LaPolla
 * Released under the MIT license
 */

'use strict';

this.InstantCodec = {};
(function(host) {

  // Collect all classes and functions on inner
  var inner = {};
  (function(host) {

this.extendClass = function(base, derived) {

  // See the following links
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill

  var Proto = function() {};

  Proto.prototype = base.prototype;
  derived.prototype = new Proto();
  derived.prototype.constructor = derived;
};

this.getUndefined = function() {};

this.hasOwnProperty = (function() {

  var fn = {}.hasOwnProperty;
  return function(object, property) {

    return fn.call(object, property);
  };
}());

this.multiInheritClass = function(base, derived) {

  // Fake multiple inheritance
  for (var name in base.prototype) {

    if (name !== 'constructor') {

      derived.prototype[name] = base.prototype[name];
    }
  }
};

  }.call(inner, host));

  // Expose only public classes and functions on InstantCodec module
  var expose = [
    'getUndefined',
  ];
  (function(inner, arr) {

    for (var i = 0; i < arr.length; i++) {

      this[arr[i]] = inner[arr[i]];
    }
  }.call(this, inner, expose));
}.call(this.InstantCodec, this));

