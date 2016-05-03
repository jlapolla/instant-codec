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

