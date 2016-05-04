/**
 * LiveBlocks 0.1.0
 * https://github.com/jlapolla/live-blocks
 *
 * Copyright (c) 2016 Justin LaPolla
 * Released under the MIT license
 */

'use strict';

this.LiveBlocks = {};
(function(host) {

  // Collect all classes and functions on inner
  var inner = {};
  (function(host) {

this.getUndefined = function() {};

this.extendClass = function(base, derived) {

  // See the following links
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill

  var Proto = function() {};

  Proto.prototype = base.prototype;
  derived.prototype = new Proto();
  derived.prototype.constructor = derived;
};

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

this.isArray = (function() {

  // See:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray#Polyfill
  var fn = {}.toString;
  return function(object) {

    return fn.call(object) === '[object Array]';
  };
}());

this.isObject = (function(isArray) {

  return function(object) {

    return typeof object === 'object' && !isArray(object);
  };
}(this.isArray));

this.maxIterations = (function() {

  var maxIterations = 100;
  return function(iterations) {

    if (arguments.length) {

      // We are setting max iterations
      maxIterations = iterations;
    }
    else {

      // We are getting max iterations
      return maxIterations;
    }
  };
}());

this.ArrayIterator = (function() {

  function ArrayIterator(arr) {

    this._array = arr;
    this._index = 0;
  }

  ArrayIterator.prototype = {};
  var P = ArrayIterator.prototype;
  P.reset = function() {

    // Reset iterator index
    this._index = 0;
  };

  P.next = function() {

    // Check if we are at the end of the iterator
    if (this._index < this._array.length) {

      // Return current value and increment index
      return {done: false, value: this._array[this._index++]};
    }
    else {

      return {done: true};
    }
  };

  P.peek = function() {

    // Check if we are at the end of the iterator
    if (this._index < this._array.length) {

      return {done: false, value: this._array[this._index]}; // Return current value
    }
    else {

      return {done: true};
    }
  };

  return ArrayIterator;
}());

this.Queue = (function(getUndefined) {

  function Queue() {

    this._queueTip = getUndefined();
    this._queueCurrent = getUndefined();
  }

  Queue.prototype = {};
  var P = Queue.prototype;
  P.push = function(item) {

    // Push item onto queue
    var next = {item: item};
    if (this._queueCurrent) {

      // Update tip if something is in the queue
      this._queueTip.next = next;
      this._queueTip = next;
      return;
    }
    else {

      // Create items if nothing is in the queue
      this._queueCurrent = next;
      this._queueTip = next;
      return;
    }
  };

  P.next = function() {

    if (this._queueCurrent) {

      // Get current item
      var item = this._queueCurrent.item;

      if (this._queueCurrent === this._queueTip) {

        // We reached the end of the queue
        this._queueCurrent = getUndefined();
        this._queueTip = getUndefined();
      }
      else {

        this._queueCurrent = this._queueCurrent.next; // Increment queue pointer
      }

      // Return item
      return item;
    }
    else {

      return; // Return undefined
    }
  };

  P.peek = function() {

    // Get next item without incrementing
    if (this._queueCurrent) {

      return this._queueCurrent.item; // We are not at the end of the queue
    }
    else {

      return; // We are at the end of the queue
    }
  };

  P.isEmpty = function() {

    return !this._queueCurrent;
  };

  return Queue;
}(this.getUndefined));

this.Set = (function(ArrayIterator) {

  var same = function(a, b) {

    return a !== a ? b !== b : a === b;
  };

  function Set() {

    this._array = [];
  }

  Set.prototype = {};
  var P = Set.prototype;
  P.add = function(value) {

    // Copy entries to new array, except entry with same value
    var array = this._array;
    var newArray = [];
    for (var i = 0; i < array.length; i++) {

      if (!same(array[i], value)) {

        newArray.push(array[i]);
      }
    }

    // Add new entry to new array
    newArray.push(value);

    // Set private array to new array
    this._array = newArray;
  };

  P.remove = function(value) {

    // Copy entries to new array, except entry with same value
    var array = this._array;
    var newArray = [];
    for (var i = 0; i < array.length; i++) {

      if (!same(array[i], value)) {

        newArray.push(array[i]);
      }
    }

    // Set private array to new array
    this._array = newArray;
  };

  P.has = function(value) {

    // Search for same value
    var array = this._array;
    for (var i = 0; i < array.length; i++) {

      if (same(array[i], value)) {

        return true;
      }
    }

    // Match not found
    return false;
  };

  P.values = function() {

    return new ArrayIterator(this._array);
  };

  return Set;
}(this.ArrayIterator));

this.Map = (function(ArrayIterator) {

  var same = function(a, b) {

    return a !== a ? b !== b : a === b;
  };

  function Map() {

    this._array = [];
  }

  Map.prototype = {};
  var P = Map.prototype;
  P.get = function(key) {

    // Get value at key
    var array = this._array;
    for (var i = 0; i < array.length; i++) {

      if (same(array[i].key, key)) {

        return array[i].value;
      }
    }
  };

  P.put = function(key, value) {

    // Copy entries to new array, except entry with matching key
    var array = this._array;
    var newArray = [];
    for (var i = 0; i < array.length; i++) {

      if (!same(array[i].key, key)) {

        newArray.push(array[i]);
      }
    }

    // Add new entry to new array
    newArray.push({key: key, value: value});

    // Set private array to new array
    this._array = newArray;
  };

  P.remove = function(key) {

    // Copy entries to new array, except entry with matching key
    var array = this._array;
    var newArray = [];
    for (var i = 0; i < array.length; i++) {

      if (!same(array[i].key, key)) {

        newArray.push(array[i]);
      }
    }

    // Set private array to new array
    this._array = newArray;
  };

  P.has = function(key) {

    // Search for matching key
    var array = this._array;
    for (var i = 0; i < array.length; i++) {

      if (same(array[i].key, key)) {

        return true;
      }
    }

    // Match not found
    return false;
  };

  P.keys = function() {

    // Copy keys to a new array
    var array = this._array;
    var keys = [];
    for (var i = 0; i < array.length; i++) {

      keys.push(array[i].key);
    }

    // Return ArrayIterator for the keys array
    return new ArrayIterator(keys);
  };

  return Map;
}(this.ArrayIterator));

this.EventEmitter = (function(hasOwnProperty) {

  function EventEmitter() {

    this._listeners = {};
  };

  EventEmitter.prototype = {};
  var P = EventEmitter.prototype;
  P.on = function(ev, callback) {

    // Look up listeners
    var listeners;
    if (hasOwnProperty(this._listeners, ev)) {

      listeners = this._listeners[ev];
    }
    else {

      listeners = [];
    }

    // Iterate over listeners and copy to newListeners
    var newListeners = [];
    var listenerExists;
    for (var i = 0; i < listeners.length; i++) {

      newListeners.push(listeners[i]);
      if (listeners[i] === callback) {

        listenerExists = true;
      }
    }

    // Add the new callback if not exists
    if (!listenerExists) {

      newListeners.push(callback);
    }

    // Replace listeners
    this._listeners[ev] = newListeners;
  };

  P.off = function(ev, callback) {

    // Look up listeners
    var listeners;
    if (hasOwnProperty(this._listeners, ev)) {

      listeners = this._listeners[ev];
    }
    else {

      return; // Nothing left to do
    }

    // Iterate over listeners and copy to newListeners
    var newListeners = [];
    for (var i = 0; i < listeners.length; i++) {

      if (listeners[i] !== callback) {

        newListeners.push(listeners[i]);
      }
    }

    // Replace listeners
    if (newListeners.length) {

      this._listeners[ev] = newListeners;
    }
    else {

      delete this._listeners[ev];
    }
  };

  P.fire = function(ev, arg) {

    // Look up listeners
    var listeners;
    if (hasOwnProperty(this._listeners, ev)) {

      listeners = this._listeners[ev];
    }
    else {

      return; // Nothing left to do
    }

    // Call each callback
    if (arguments.length > 1) {

      for (var i = 0; i < listeners.length; i++) {

        listeners[i](arg);
      }
    }
    else {

      for (var i = 0; i < listeners.length; i++) {

        listeners[i]();
      }
    }
  };

  return EventEmitter;
}(this.hasOwnProperty));

this.Wire = (function(getUndefined,
  hasOwnProperty,
  Queue,
  Error,
  EventEmitter,
  extendClass,
  ArrayIterator,
  maxIterations) {

  var _notify = function() {

    // Get bindings list
    var bindings = this._bindings;

    // Update each bound block
    for (var i = 0; i < bindings.length; i++) {

      bindings[i].block.update(bindings[i].pin);
    }
  };

  function Wire() {

    EventEmitter.call(this);

    this._bindings = [];
    this._updating = false;
    this._valueQueue = new Queue();
  }

  extendClass(EventEmitter, Wire);
  var P = Wire.prototype;
  P.equalTo = function(value) {

    // Compare with ===, but let NaN === NaN be true
    if (value !== value) {

      return this._value !== this._value;
    }
    else {

      return value === this._value;
    }
  };

  P.bind = function(block, pin) {

    // Get bindings list
    var bindings = this._bindings;

    // Iterate over bindings and copy to new bindings
    var newBindings = [];
    var bindingExists;
    for (var i = 0; i < bindings.length; i++) {

      newBindings.push(bindings[i]);
      if (bindings[i].block === block && bindings[i].pin === pin) {

        bindingExists = true;
      }
    }

    // Add new binding if not exists
    if (!bindingExists) {

      // Add binding
      newBindings.push({block: block, pin: pin});
    }

    // Replace existing bindings
    this._bindings = newBindings;

    if (!bindingExists) {

      // Fire event
      this.fire('connect', {block: block, pin: pin});
    }
  };

  P.unbind = function(block, pin) {

    // Get bindings list
    var bindings = this._bindings;

    // Iterate over bindings and copy to new bindings
    var newBindings = [];
    for (var i = 0; i < bindings.length; i++) {

      if (bindings[i].block !== block || bindings[i].pin !== pin) {

        newBindings.push(bindings[i]);
      }
    }

    // Replace existing bindings
    this._bindings = newBindings;

    if (bindings.length !== newBindings.length) {

      // Fire event
      this.fire('disconnect', {block: block, pin: pin});
    }
  };

  P.value = function(newValue) {

    try {

      if (arguments.length) {

        // We are setting a new value

        // Check updating flag
        if (this._updating) {

          // Add new value to queue and return

          // Don't add the same value to the queue
          if (!this.equalTo(newValue)) {

            this._valueQueue.push(newValue);
          }

          // Return
          return;
        }
        else {

          this._updating = true; // Set updating flag
        }

        // Main loop
        var iterations = 1;
        while (true) {

          // Check iteration count
          if (iterations++ > maxIterations()) {

            throw new Error('Infinite loop detected: reached '
              + maxIterations() + ' iterations');
          }

          // Compare new value to current value
          if (!this.equalTo(newValue)) {

            // Set new value
            this._value = newValue;

            // Notify bound blocks
            _notify.call(this);

            // Fire event
            this.fire('value', newValue);
          }

          // Process value queue
          if (this._valueQueue.isEmpty()) {

            // Unset updating flag and return
            this._updating = false;
            return;
          }
          else {

            newValue = this._valueQueue.next(); // Get next value from queue
          }

          // Restart loop
        }
      }
      else {

        return this._value; // We are getting the value
      }
    }
    catch (err) {

      // Unset updating flag
      this._updating = false;
      throw err;
    }
  };

  P.connections = function() {

    // Collect bindings in an array
    var arr = [];
    var bindings = this._bindings;
    for (var i = 0; i < bindings.length; i++) {

      arr.push({block: bindings[i].block, pin: bindings[i].pin});
    }

    return new ArrayIterator(arr);
  };

  return Wire;
}(this.getUndefined,
  this.hasOwnProperty,
  this.Queue,
  host.Error,
  this.EventEmitter,
  this.extendClass,
  this.ArrayIterator,
  this.maxIterations));

this.ImmediateBlock = (function(hasOwnProperty,
  Queue,
  Error,
  extendClass,
  EventEmitter,
  ArrayIterator,
  maxIterations) {

  var _disconnect = function(pin) {

    // Disconnect from wire, if any
    if (hasOwnProperty(this._wires, pin)) {

      var wire = this._wires[pin];
      wire.unbind(this, pin);
      delete this._wires[pin];

      // Fire disconnect event
      this.fire('disconnect', {pin: pin, wire: wire});
    }
  };

  function ImmediateBlock(hash) {

    EventEmitter.call(this);

    this._pins = {};
    this._wires = {};
    this._updating = false;
    this._updateQueue = new Queue();

    for (var name in hash.pins) {

      this._pins[name] = hash.pins[name];
    }
  }

  extendClass(EventEmitter, ImmediateBlock);
  var P = ImmediateBlock.prototype;
  P.error = function() {

    return this._lastError;
  };

  P.connect = function(pin, wire) {

    // Throw error if pin does not exist
    if (!hasOwnProperty(this._pins, pin)) {

      throw new Error('Pin "' + pin + '" not found');
    }

    // Do nothing if the pin is already connected to the wire
    if (this._wires[pin] === wire) {

      return;
    }

    // Disconnect from old wire, if any
    _disconnect.call(this, pin);

    // Record new wire
    this._wires[pin] = wire;

    // Bind pin to wire
    wire.bind(this, pin);

    // Fire connect event
    this.fire('connect', {pin: pin, wire: wire});

    // Process wire value
    this.update(pin);
  };

  P.disconnect = function(pin) {

    // Disconnect from wire, if any
    if (hasOwnProperty(this._wires, pin)) {

      var wire = this._wires[pin];
      wire.unbind(this, pin);
      delete this._wires[pin];

      // Process wire value
      this.update(pin);

      // Fire disconnect event
      this.fire('disconnect', {pin: pin, wire: wire});
    }
  };

  P.update = function(pin) {

    try {

      // A connected wire value changed

      // Check updating flag
      if (this._updating) {

        // Add update to queue and return
        this._updateQueue.push(pin);
        return;
      }
      else {

        this._updating = true; // Set updating flag
      }

      // Main loop
      var iterations = 1;
      while (true) {

        // Check iteration count
        if (iterations++ > maxIterations()) {

          throw new Error('Infinite loop detected: reached '
            + maxIterations() + ' iterations');
        }

        // Construct hash of wires and wire values
        var wires = {};
        var wireValues = {};
        for (var name in this._wires) {

          wires[name] = this._wires[name];
          wireValues[name] = wires[name].value();
        }

        // Fire update event
        this.fire('update', {pin: pin, value: wireValues[pin]});

        // Execute pin function in a try block
        try {

          // Call pin function on wireValues and outputs hash
          var outputs = {};
          var fn = this._pins[pin];
          fn(wireValues, outputs);
          delete this._lastError;

          // Send new wire values to wires
          for (var name in wires) {

            if (hasOwnProperty(outputs, name)) {

              wires[name].value(outputs[name]);
            }
          }

          // Fire event
          this.fire('success');
        }
        catch (e) {

          this._lastError = e;
          this.fire('error', e);
        }

        // Proces update queue
        if (this._updateQueue.isEmpty()) {

          // Unset updating flag and return
          this._updating = false;
          return;
        }
        else {

          pin = this._updateQueue.next(); // Get next updated pin from queue
        }

        // Restart loop
      }
    }
    catch (err) {

      // Unset updating flag
      this._updating = false;
      throw err;
    }
  };

  P.pins = function() {

    // Create array of pins
    var pins = [];
    for (var pin in this._pins) {

      pins.push({pin: pin, wire: this._wires[pin]});
    }

    return new ArrayIterator(pins);
  };

  return ImmediateBlock;
}(this.hasOwnProperty,
  this.Queue,
  host.Error,
  this.extendClass,
  this.EventEmitter,
  this.ArrayIterator,
  this.maxIterations));

this.ClockedBlock = (function(EventEmitter,
  extendClass,
  hasOwnProperty,
  getUndefined,
  ArrayIterator) {

  function ClockedBlock(hash) {

    EventEmitter.call(this);

    this._pins = {};
    this._wires = {};
    this._do = hash.do;

    // Record pins
    for (var i = 0; i < hash.pins.length; i++) {

      this._pins[hash.pins[i]] = this._pins;
    }
  }

  extendClass(EventEmitter, ClockedBlock);
  var P = ClockedBlock.prototype;
  P.error = function() {

    return this._lastError;
  };

  P.connect = function(pin, wire) {

    // Throw error if pin does not exist
    if (!hasOwnProperty(this._pins, pin)) {

      throw new Error('Pin "' + pin + '" not found');
    }

    // Do nothing if the pin is already connected to the wire
    if (this._wires[pin] === wire) {

      return;
    }

    // Disconnect from old wire, if any
    this.disconnect(pin);

    // Record new wire
    this._wires[pin] = wire;

    // Bind pin to wire
    wire.bind(this, pin);

    // Fire connect event
    this.fire('connect', {pin: pin, wire: wire});
  };

  P.disconnect = function(pin) {

    // Disconnect from wire, if any
    if (hasOwnProperty(this._wires, pin)) {

      var wire = this._wires[pin];
      wire.unbind(this, pin);
      delete this._wires[pin];

      // Fire disconnect event
      this.fire('disconnect', {pin: pin, wire: wire});
    }
  };

  P.update = getUndefined; // noop

  P.pins = function() {

    // Create array of pins
    var pins = [];
    for (var pin in this._pins) {

      pins.push({pin: pin, wire: this._wires[pin]});
    }

    return new ArrayIterator(pins);
  };

  P.clock = function(clock) {

    if (arguments.length) {

      // We are setting a new clock

      // Do nothing if we are already using this clock
      if (this._clock === clock) {

        return;
      }

      // Unset old clock if any
      this.unsetClock();

      // Record new clock
      this._clock = clock;

      // Bind to clock
      clock.bind(this);
    }
    else {

      return this._clock; // We are getting the clock
    }
  };

  P.unsetClock = function() {

    // Unbind from old clock if any
    if (hasOwnProperty(this, '_clock')) {

      var clock = this._clock;
      clock.unbind(this);
      delete this._clock;
    }
  };

  P.tick = function() {

    // Construct hash of wire values
    var wireValues = {};
    for (var name in this._wires) {

      wireValues[name] = this._wires[name].value();
    }

    // Fire tick event
    this.fire('tick');

    // Execute do function in a try block
    try {

      // Call do function on wire values and outputs hash
      var fn = this._do;
      var outputs = {};
      fn(wireValues, outputs);
      delete this._lastError;
      this._nextValues = outputs;
    }
    catch (e) {

      this._lastError = e;
      this.fire('error', e);
    }
  };

  P.tock = function() {

    if (this._nextValues) {

      // Defensive copy hash of wires
      var wires = {};
      for (var name in this._wires) {

        wires[name] = this._wires[name];
      }

      // Send new wire values to wires
      for (var name in this._nextValues) {

        if (hasOwnProperty(wires, name)) {

          wires[name].value(this._nextValues[name]);
        }
      }

      // Clear this._nextValues
      delete this._nextValues;

      // Fire tock event
      this.fire('tock');
    }
  };

  return ClockedBlock;
}(this.EventEmitter,
  this.extendClass,
  this.hasOwnProperty,
  this.getUndefined,
  this.ArrayIterator));

this.TimedBlock = (function(EventEmitter,
  extendClass,
  hasOwnProperty,
  Error,
  ArrayIterator) {

  var _disconnect = function(pin) {

    // Disconnect from wire, if any
    if (hasOwnProperty(this._wires, pin)) {

      var wire = this._wires[pin];
      wire.unbind(this, pin);
      delete this._wires[pin];

      // Fire disconnect event
      this.fire('disconnect', {pin: pin, wire: wire});
    }
  };

  function TimedBlock(hash) {

    EventEmitter.call(this);

    this._pins = {};
    this._wires = {};
    this._do = hash.do;
    this._previousValues = {};

    // Record pins
    for (var i = 0; i < hash.pins.length; i++) {

      this._pins[hash.pins[i]] = this._pins;
    }
  }

  extendClass(EventEmitter, TimedBlock);
  var P = TimedBlock.prototype;
  P.error = function() {

    return this._lastError;
  };

  P.connect = function(pin, wire) {

    // Throw error if pin does not exist
    if (!hasOwnProperty(this._pins, pin)) {

      throw new Error('Pin "' + pin + '" not found');
    }

    // Do nothing if the pin is already connected to the wire
    if (this._wires[pin] === wire) {

      return;
    }

    // Disconnect from old wire, if any
    _disconnect.call(this, pin);

    // Record new wire
    this._wires[pin] = wire;

    // Bind pin to wire
    wire.bind(this, pin);

    // Fire connect event
    this.fire('connect', {pin: pin, wire: wire});

    // Process wire value
    this.update(pin);
  };

  P.disconnect = function(pin) {

    // Disconnect from wire, if any
    if (hasOwnProperty(this._wires, pin)) {

      var wire = this._wires[pin];
      wire.unbind(this, pin);
      delete this._wires[pin];

      // Process wire value
      this.update(pin);

      // Fire disconnect event
      this.fire('disconnect', {pin: pin, wire: wire});
    }
  };

  P.update = function() {

    this._timer.schedule(this);
  };

  P.pins = function() {

    // Create array of pins
    var pins = [];
    for (var pin in this._pins) {

      pins.push({pin: pin, wire: this._wires[pin]});
    }

    return new ArrayIterator(pins);
  };

  P.timer = function(timer) {

    if (arguments.length) {

      // We are setting a new timer

      // Unset old timer if any
      this.unsetTimer();

      // Record new timer
      this._timer = timer;
    }
    else {

      return this._timer; // We are getting the timer
    }
  };

  P.unsetTimer = function() {

    delete this._timer;
  };

  P.tick = function() {

    // Indicates change since previous values
    var change;

    // Construct hash of wire values and scan for changes
    var input = {};
    for (var name in this._wires) {

      // Check for change
      if (hasOwnProperty(this._previousValues, name)
        && this._wires[name].equalTo(this._previousValues[name])) {

        // No change detected

        // Get the value directly from the previous values
        input[name] = this._previousValues[name];
      }
      else {

        // A new wire was connected or a wire value changed
        change = true;

        // Get value directly from the wire
        input[name] = this._wires[name].value();
      }
    }

    // Check previous values for changes
    if (!(change || this._tickRequested)) {

      for (var name in this._previousValues) {

        if (!hasOwnProperty(input, name)) {

          // A wire was disconnected since we last ran
          change = true;
        }
      }
    }

    // Run tick event if change or tick was explicitly requested
    if (change || this._tickRequested || this._lastError) {

      // Clear tick requested flag
      delete this._tickRequested;

      // Fire tick event
      this.fire('tick');

      // Execute do function in a try block
      try {

        // Call do function on input, output, and previous values
        var fn = this._do;
        var output = {};
        this._tickRequested = !!fn(input, output, this._previousValues);
        delete this._lastError;
        this._nextValues = output;

        // N.b. input is probably untouched, so we need to overlay the output
        // on input to arrive at our new previous values.

        // input may have been changed if it contains mutable objects. But if
        // the "do" function changes input or previous, then there's nothing
        // we can do to stop that. If it changes a mutable object in input or
        // previous, it may have changed the mutable object held by the wire
        // itself, without the wire's knowledge. There is nothing we can do
        // about this. It's up to the circuit designer to ensure that nothing
        // in input or previuos is changed. This is part of the contract of the
        // "do" function.

        // Record previous values
        for (var name in output) {

          if (hasOwnProperty(input, name)) {

            input[name] = output[name];
          }
        }

        this._previousValues = input;

        // Schedule new tick if tick requested
        if (this._tickRequested) {

          this._timer.schedule(this);
        }
        else {

          // No need to keep the property around if it's falsey
          delete this._tickRequested;
        }
      }
      catch (e) {

        this._lastError = e;
        this.fire('error', e);
      }
    }
  };

  P.tock = function() {

    if (this._nextValues) {

      // Defensive copy hash of wires
      var wires = {};
      for (var name in this._wires) {

        wires[name] = this._wires[name];
      }

      // Send new wire values to wires
      for (var name in this._nextValues) {

        if (hasOwnProperty(wires, name)) {

          wires[name].value(this._nextValues[name]);
        }
      }

      // Clear this._nextValues
      delete this._nextValues;

      // Fire tock event
      this.fire('tock');
    }
  };

  return TimedBlock;
}(this.EventEmitter,
  this.extendClass,
  this.hasOwnProperty,
  host.Error,
  this.ArrayIterator));

this.Clock = (function(Set,
  EventEmitter,
  extendClass) {

  function Clock() {

    EventEmitter.call(this);

    this._bindings = new Set();
  }

  extendClass(EventEmitter, Clock);
  var P = Clock.prototype;
  P.tick = function() {

    // Get iterator over blocks
    var it = this._bindings.values();

    // Call tick() on all blocks
    while (!it.peek().done) {

      it.next().value.tick();
    }

    // Call tock() on all blocks
    it.reset();
    while (!it.peek().done) {

      it.next().value.tock();
    }

    // Fire event
    this.fire('tick');
  };

  P.bind = function(block) {

    this._bindings.add(block);
  };

  P.unbind = function(block) {

    this._bindings.remove(block);
  };

  P.blocks = function() {

    // Return iterator over blocks
    return this._bindings.values();
  };

  return Clock;
}(this.Set,
 this.EventEmitter,
 this.extendClass));

this.ManualTimer = (function(Set,
  EventEmitter,
  extendClass) {

  function ManualTimer() {

    EventEmitter.call(this);

    this._set = new Set();
  };

  extendClass(EventEmitter, ManualTimer);
  var P = ManualTimer.prototype;
  P.tick = function() {

    // Get iterator over scheduled items
    var it = this._set.values();

    if (!it.peek().done) {

      // Get a new set
      this._set = new Set();

      // Call tick() on all blocks
      while (!it.peek().done) {

        it.next().value.tick();
      }

      // Call tock() on all blocks
      it.reset();
      while (!it.peek().done) {

        it.next().value.tock();
      }

      // Fire event
      this.fire('tick');
    }
  };

  P.schedule = function(block) {

    this._set.add(block);
  };

  P.cancel = function(block) {

    if (arguments.length) {

      // We are cancelling a single block
      this._set.remove(block);
    }
    else {

      // We are cancelling all blocks
      this._set = new Set();
    }
  };

  return ManualTimer;
}(this.Set,
  this.EventEmitter,
  this.extendClass));

this.AsyncTimer = (function(Set,
  hasOwnProperty,
  setTimeout,
  clearTimeout,
  extendClass,
  EventEmitter) {

  var _tick = function() {

    // Remove old _timeoutId
    delete this._timeoutId;

    // Get iterator over scheduled items
    var it = this._set.values();

    // Get a new set
    this._set = new Set();

    // Call tick() on all blocks
    while (!it.peek().done) {

      it.next().value.tick();
    }

    // Call tock() on all blocks
    it.reset();
    while (!it.peek().done) {

      it.next().value.tock();
    }

    // Fire event
    this.fire('tick');
  };

  function AsyncTimer() {

    EventEmitter.call(this);

    this._set = new Set();
    this._tick = _tick.bind(this);
    this._enabled = true;
  }

  extendClass(EventEmitter, AsyncTimer);
  var P = AsyncTimer.prototype;
  P.schedule = function(block) {

    this._set.add(block);

    // Set timeout, if no timeout exists
    if (this._enabled && !hasOwnProperty(this, '_timeoutId')) {

      this._timeoutId = setTimeout(this._tick);
    }
  };

  P.cancel = function(block) {

    if (arguments.length) {

      // We are cancelling a single block
      this._set.remove(block);
    }
    else {

      // We are cancelling all blocks
      this._set = new Set();
    }

    // Clear timeout if we have no scheduled blocks
    if (hasOwnProperty(this, '_timeoutId')
      && this._set.values().peek().done) {

      clearTimeout(this._timeoutId);
      delete this._timeoutId;
    }
  };

  P.enabled = function(newValue) {

    if (arguments.length) {

      // We are setting the value
      if (newValue) {

        // We are enabling the timer

        // Set enabled flag
        this._enabled = true;

        // Set timeout if no timeout exists and we have scheduled blocks
        if (!(hasOwnProperty(this, '_timeoutId')
          || this._set.values().peek().done)) {

          this._timeoutId = setTimeout(this._tick);
        }
      }
      else {

        // We are disabling the timer

        // Reset enabled flag
        this._enabled = false;

        // Clear any existing timeout
        if (hasOwnProperty(this, '_timeoutId')) {

          clearTimeout(this._timeoutId);
          delete this._timeoutId;
        }
      }
    }
    else {

      // We are getting the value
      return this._enabled;
    }
  };

  return AsyncTimer;
}(this.Set,
  this.hasOwnProperty,
  host.setTimeout,
  host.clearTimeout,
  this.extendClass,
  this.EventEmitter));

this.IntervalTimer = (function(Set,
  hasOwnProperty,
  setTimeout,
  clearTimeout,
  extendClass,
  EventEmitter) {

  var _tick = function() {

    // Get iterator over scheduled items
    var it = this._set.values();

    if (it.peek().done) {

      // There are no blocks scheduled

      // Remove old _timeoutId
      delete this._timeoutId;
    }
    else {

      // There are blocks scheduled

      // Start a new timeout
      this._timeoutId = setTimeout(this._tick, this._interval);

      // Get a new set
      this._set = new Set();

      // Call tick() on all blocks
      while (!it.peek().done) {

        it.next().value.tick();
      }

      // Call tock() on all blocks
      it.reset();
      while (!it.peek().done) {

        it.next().value.tock();
      }

      // Fire event
      this.fire('tick');
    }
  };

  function IntervalTimer() {

    EventEmitter.call(this);

    this._set = new Set();
    this._tick = _tick.bind(this);
    this._enabled = true;
    this._interval = 40;
  }

  extendClass(EventEmitter, IntervalTimer);
  var P = IntervalTimer.prototype;
  P.schedule = function(block) {

    this._set.add(block);

    // Set timeout, if no timeout exists
    if (this._enabled && !hasOwnProperty(this, '_timeoutId')) {

      this._timeoutId = setTimeout(this._tick, this._interval);
    }
  };

  P.cancel = function(block) {

    if (arguments.length) {

      // We are cancelling a single block
      this._set.remove(block);
    }
    else {

      // We are cancelling all blocks
      this._set = new Set();
    }

    // Clear timeout if we have no scheduled blocks
    if (hasOwnProperty(this, '_timeoutId')
      && this._set.values().peek().done) {

      clearTimeout(this._timeoutId);
      delete this._timeoutId;
    }
  };

  P.enabled = function(newValue) {

    if (arguments.length) {

      // We are setting the value
      if (newValue) {

        // We are enabling the timer

        // Set enabled flag
        this._enabled = true;

        // Set timeout if no timeout exists and we have scheduled blocks
        if (!(hasOwnProperty(this, '_timeoutId')
          || this._set.values().peek().done)) {

          this._timeoutId = setTimeout(this._tick, this._interval);
        }
      }
      else {

        // We are disabling the timer

        // Reset enabled flag
        this._enabled = false;

        // Clear any existing timeout
        if (hasOwnProperty(this, '_timeoutId')) {

          clearTimeout(this._timeoutId);
          delete this._timeoutId;
        }
      }
    }
    else {

      // We are getting the value
      return this._enabled;
    }
  };

  P.interval = function(newValue) {

    if (arguments.length) {

      // We are setting the value
      this._interval = newValue;
    }
    else {

      // We are getting the value
      return this._interval;
    }
  };

  return IntervalTimer;
}(this.Set,
  this.hasOwnProperty,
  host.setTimeout,
  host.clearTimeout,
  this.extendClass,
  this.EventEmitter));

this.BlackBox = (function(EventEmitter,
  extendClass,
  hasOwnProperty,
  Queue,
  getUndefined,
  Map,
  Set,
  Error,
  ArrayIterator,
  maxIterations) {

  var _internalErrorListener = function(arg) {

    if (!this._updating) {

      this.fire('error', arg);
    }
  };

  var _internalUpdateListener = function() {

    if (!this._updating) {

      // Defensive copy external wires
      var internalWires = this._internalWires;
      var externalWires = {};
      for (var name in internalWires) {

        // Copy external wire, if exists
        if (this._externalWires[name]) {

          externalWires[name] = this._externalWires[name];
        }
      }

      // Handle successful run
      if (!this.error()) {

        // Copy values from internal wires to external wires
        for (var name in internalWires) {

          if (externalWires[name]) {

            externalWires[name].value(internalWires[name].value());
          }
        }
      }
    }
  };

  var _disconnect = function(pin) {

    // Disconnect from wire, if any
    if (hasOwnProperty(this._externalWires, pin)) {

      var wire = this._externalWires[pin];
      wire.unbind(this, pin);
      delete this._externalWires[pin];

      // Fire disconnect event
      this.fire('disconnect', {pin: pin, wire: wire});
    }
  };

  var init = (function() {

    var processWire;
    var processBlock;

    processWire = function(wire, wireSet, blockSet) {

      // Check if this wire has already been processed
      if (!wireSet.has(wire)) {

        // Wire has not been processed
        // Add wire to wire set
        wireSet.add(wire);

        // Process all blocks connected to the wire
        var it = wire.connections();
        while (!it.peek().done) {

          processBlock.call(this, it.next().value.block, wireSet, blockSet);
        }
      }
    };

    processBlock = function(block, wireSet, blockSet) {

      // Check if this block has already been processed
      if (!blockSet.has(block)) {

        // Block has not been processed
        // Add block to block set
        blockSet.add(block);

        // Attach internal error listener
        block.on('error', this._internalErrorListener);

        // Process all wires connected to the block
        var it = block.pins();
        while (!it.peek().done) {

          processWire.call(this, it.next().value.wire, wireSet, blockSet);
        }
      }
    };

    return function(pins) {

      // Create internal update listener
      this._internalUpdateListener = _internalUpdateListener.bind(this);

      // Create internal error listener
      this._internalErrorListener = _internalErrorListener.bind(this);

      // Create wire set and block set
      // These collect all wires and blocks in the network
      var wireSet = new Set();
      var blockSet = new Set();

      // Process pins hash
      for (var pin in pins) {

        // Add pin to internal wire hash
        this._internalWires[pin] = pins[pin];

        // Listen for value changes on the internal wire
        pins[pin].on('value', this._internalUpdateListener);

        // Process the wire and all connected blocks
        processWire.call(this, pins[pin], wireSet, blockSet);
      }

      // All blocks are in the block set now
      // Store the block set
      this._innerBlockSet = blockSet;
    };
  }());

  function BlackBox(hash) {

    EventEmitter.call(this);

    this._updating = false;
    this._internalWires = {};
    this._externalWires = {};
    this._updateQueue = new Queue();

    init.call(this, hash.pins);
  }

  extendClass(EventEmitter, BlackBox);
  var P = BlackBox.prototype;
  P.error = function() {

    // Iterate through blocks and check for errors
    var it = this._innerBlockSet.values();
    while (!it.peek().done) {

      // Get the block
      var block = it.peek().value;

      // Check block for error
      if (block.error()) {

        return block.error();
      }

      // Move to next block
      it.next();
    }
  };

  P.connect = function(pin, wire) {

    // Throw error if pin does not exist
    if (!hasOwnProperty(this._internalWires, pin)) {

      throw new Error('Pin "' + pin + '" not found');
    }

    // Do nothing if the pin is already connected to the wire
    if (this._externalWires[pin] !== wire) {

      // Disconnect from old wire, if any
      _disconnect.call(this, pin);

      // Record new wire
      this._externalWires[pin] = wire;

      // Bind pin to wire
      wire.bind(this, pin);

      // Fire connect event
      this.fire('connect', {pin: pin, wire: wire});

      // Process wire value
      this.update(pin);
    }
  };

  P.disconnect = function(pin) {

    // Disconnect from wire, if any
    if (hasOwnProperty(this._externalWires, pin)) {

      var wire = this._externalWires[pin];
      wire.unbind(this, pin);
      delete this._externalWires[pin];

      // Process wire value
      this.update(pin);

      // Fire disconnect event
      this.fire('disconnect', {pin: pin, wire: wire});
    }
  };

  P.update = function(pin) {

    try {

      // A connected wire value changed

      // Check updating flag
      if (this._updating) {

        // Add update to queue and return
        this._updateQueue.push(pin);
        return;
      }
      else {

        this._updating = true; // Set updating flag
      }

      // Main loop
      var iterations = 1;
      while (true) {

        // Check iteration count
        if (iterations++ > maxIterations()) {

          throw new Error('Infinite loop detected: reached '
            + maxIterations() + ' iterations');
        }

        // Defensive copy external wires
        var internalWires = this._internalWires;
        var externalWires = {};
        for (var name in internalWires) {

          // Copy external wire, if exists
          if (hasOwnProperty(this._externalWires, name)) {

            externalWires[name] = this._externalWires[name];
          }
        }

        // Get updated pin value
        var value;
        if (externalWires[pin]) {

          value = externalWires[pin].value();
        }
        else {

          value = getUndefined();
        }

        // Fire update event
        this.fire('update', {pin: pin, value: value});

        // Copy updated pin value to internal wire
        if (externalWires[pin]) {

          internalWires[pin].value(externalWires[pin].value());
        }
        else {

          internalWires[pin].value(getUndefined());
        }

        // Handle successful run
        if (this.error()) {

          this.fire('error', this.error()); // Fire event
        }
        else {

          // Copy values from internal wires to external wires
          for (var name in internalWires) {

            if (hasOwnProperty(externalWires, name)) {

              externalWires[name].value(internalWires[name].value());
            }
          }

          // Fire event
          this.fire('success');
        }

        // Proces update queue
        if (this._updateQueue.isEmpty()) {

          // Unset updating flag and return
          this._updating = false;
          return;
        }
        else {

          pin = this._updateQueue.next(); // Get next updated pin from queue
        }

        // Restart loop
      }
    }
    catch (err) {

      // Unset updating flag
      this._updating = false;
      throw err;
    }
  };

  P.pins = function() {

    // Collect pins in an array
    var arr = [];
    for (var pin in this._internalWires) {

      arr.push({pin: pin, wire: this._externalWires[pin]});
    }

    // Return array iterator
    return new ArrayIterator(arr);
  };

  return BlackBox;
}(this.EventEmitter,
  this.extendClass,
  this.hasOwnProperty,
  this.Queue,
  this.getUndefined,
  this.Map,
  this.Set,
  host.Error,
  this.ArrayIterator,
  this.maxIterations));

this.ArrayRepeatBox = (function(EventEmitter,
  extendClass,
  Queue,
  isArray,
  BlackBox,
  getUndefined,
  hasOwnProperty,
  ArrayIterator,
  maxIterations) {

  var internalErrorListener = function(arg) {

    if (!this._updating) {

      this.fire('error', arg);
    }
  };

  var internalUpdateListener = function() {

    if (!this._updating) {

      // Defensive copy external wires
      var externalWires = {};
      for (var pin in this._pinNames) {

        // Copy external wire, if exists
        if (hasOwnProperty(this._externalWires, pin)) {

          externalWires[pin] = this._externalWires[pin];
        }
      }

      // Handle successful run
      if (!this.error()) {

        // Copy values from internal wires to external wires
        for (var pin in this._pinNames) {

          if (hasOwnProperty(externalWires, pin)) {

            var arr = [];
            for (var i = 0; i < this._internalWires.length; i++) {

              arr.push(this._internalWires[i][pin].value());
            }

            externalWires[pin].value(arr);
          }
        }
      }
    }
  };

  var disconnect = function(pin) {

    // Disconnect from wire, if any
    if (hasOwnProperty(this._externalWires, pin)) {

      var wire = this._externalWires[pin];
      wire.unbind(this, pin);
      delete this._externalWires[pin];

      // Fire disconnect event
      this.fire('disconnect', {pin: pin, wire: wire});
    }
  };

  var init = function() {

    // Collect valid pin names in a hash
    this._pinNames = {};
    var pins = this._factory();
    for (var pin in pins) {

      this._pinNames[pin] = this._pinNames;
    }

    // Create internal update listener
    this._internalUpdateListener = internalUpdateListener.bind(this);

    // Create internal error listener
    this._internalErrorListener = internalErrorListener.bind(this);
  };

  function ArrayRepeatBox(hash) {

    EventEmitter.call(this);

    this._factory = hash.factory;
    this._externalWires = {};
    this._internalWires = [];
    this._internalBlocks = [];
    this._updateQueue = new Queue();

    init.call(this);
  };

  extendClass(EventEmitter, ArrayRepeatBox);
  var P = ArrayRepeatBox.prototype;
  P.error = function() {

    if (hasOwnProperty(this, '_lastError')) {

      return this._lastError;
    }
    else {

      // Iterate through blocks and check for errors
      for (var i = 0; i < this._internalBlocks.length; i++) {

        // Check block for error
        if (this._internalBlocks[i].error()) {

          return this._internalBlocks[i].error();
        }
      }
    }
  };

  P.connect = function(pin, wire) {

    // Throw error if pin does not exist
    if (!hasOwnProperty(this._pinNames, pin)) {

      throw new Error('Pin "' + pin + '" not found');
    }

    // Do nothing if the pin is already connected to the wire
    if (this._externalWires[pin] !== wire) {

      // Disconnect from old wire, if any
      disconnect.call(this, pin);

      // Record new wire
      this._externalWires[pin] = wire;

      // Bind pin to wire
      wire.bind(this, pin);

      // Fire connect event
      this.fire('connect', {pin: pin, wire: wire});

      // Process wire value
      this.update(pin);
    }
  };

  P.disconnect = function(pin) {

    // Disconnect from wire, if any
    if (hasOwnProperty(this._externalWires, pin)) {

      var wire = this._externalWires[pin];
      wire.unbind(this, pin);
      delete this._externalWires[pin];

      // Process wire value
      this.update(pin);

      // Fire disconnect event
      this.fire('disconnect', {pin: pin, wire: wire});
    }
  };

  P.update = function(pin) {

    try {

      // A connected wire value changed

      // Check updating flag
      if (this._updating) {

        // Add update to queue and return
        this._updateQueue.push(pin);
        return;
      }
      else {

        this._updating = true; // Set updating flag
      }

      // Main loop
      var iterations = 1;
      while (true) {

        // Check iteration count
        if (iterations++ > maxIterations()) {

          throw new Error('Infinite loop detected: reached '
            + maxIterations() + ' iterations');
        }

        // Defensive copy external wires
        var externalWires = {};
        for (var name in this._pinNames) {

          // Copy external wire, if exists
          if (hasOwnProperty(this._externalWires, name)) {

            externalWires[name] = this._externalWires[name];
          }
        }

        // Get updated pin value
        var value;
        if (hasOwnProperty(externalWires, pin)) {

          value = externalWires[pin].value();
        }
        else {

          value = getUndefined();
        }

        // Fire update event
        this.fire('update', {pin: pin, value: value});

        // Fire error if value is not an array
        if (isArray(value)) {

          // Clear last error
          delete this._lastError;

          // Copy each element of new pin value to an internal wire
          var i = 0;
          var newInternalWires = [];
          var newInternalBlocks = [];
          for (; i < value.length; i++) {

            // Add elements to newInternalWires and newInternalBlocks
            if (i < this._internalBlocks.length) {

              // Recycle existing block
              newInternalWires.push(this._internalWires[i]);
              newInternalBlocks.push(this._internalBlocks[i]);
            }
            else {

              // Create new circuit
              var pins = this._factory();

              // Add _internalUpdateListener to newly created pins
              for (var name in pins) {

                pins[name].on('value', this._internalUpdateListener);
              }

              // Create block
              var block = new BlackBox({pins: pins});

              // Add _internalErrorListener to newly created block
              block.on('error', this._internalErrorListener);

              // Add new wires and block
              newInternalWires.push(pins);
              newInternalBlocks.push(block);
            }

            // Copy value to appropriate internal wire
            newInternalWires[i][pin].value(value[i]);
          }

          // Delete extra blocks and wires
          for (; i < this._internalBlocks.length; i++) {

            var pins = this._internalWires[i];
            var block = this._internalBlocks[i];

            // Remove _internalErrorListener from block
            block.off('error', this._internalErrorListener);

            for (var name in pins) {

              // Remove _internalUpdateListener from pins
              pins[name].off('value', this._internalUpdateListener);

              // Disconnect wires from block
              block.disconnect(name);
            }
          }

          this._internalWires = newInternalWires;
          this._internalBlocks = newInternalBlocks;

          // Handle successful run
          if (this.error()) {

            this.fire('error', this.error()); // Fire event
          }
          else {

            // Copy values from internal wires to external wires
            for (var name in this._pinNames) {

              if (hasOwnProperty(externalWires, name)) {

                var arr = [];
                for (var i = 0; i < newInternalWires.length; i++) {

                  arr.push(newInternalWires[i][name].value());
                }

                externalWires[name].value(arr);
              }
            }

            // Fire event
            this.fire('success');
          }
        }
        else {

          this._lastError = new Error('Pin ' + pin + ' must be an array');
          this.fire('error', this.error()); // Fire event
        }

        // Process update queue
        if (this._updateQueue.isEmpty()) {

          // Unset updating flag and return
          this._updating = false;
          return;
        }
        else {

          pin = this._updateQueue.next(); // Get next updated pin from queue
        }

        // Restart loop
      }
    }
    catch (err) {

      // Unset updating flag
      this._updating = false;
      throw err;
    }
  };

  P.pins = function() {

    // Collect pins in an array
    var arr = [];
    for (var pin in this._pinNames) {

      arr.push({pin: pin, wire: this._externalWires[pin]});
    }

    // Return array iterator
    return new ArrayIterator(arr);
  };

  P.blocks = function() {

    var arr = [];
    for (var i = 0; i < this._internalBlocks.length; i++) {

      arr.push({block: this._internalBlocks[i], index: i});
    }

    // Return array iterator
    return new ArrayIterator(arr);
  };

  P.block = function(index) {

    // Return block
    return this._internalBlocks[index];
  };

  return ArrayRepeatBox;
}(this.EventEmitter,
  this.extendClass,
  this.Queue,
  this.isArray,
  this.BlackBox,
  this.getUndefined,
  this.hasOwnProperty,
  this.ArrayIterator,
  this.maxIterations));

this.ObjectRepeatBox = (function(EventEmitter,
  extendClass,
  Queue,
  isObject,
  BlackBox,
  getUndefined,
  hasOwnProperty,
  ArrayIterator,
  maxIterations) {

  var internalErrorListener = function(arg) {

    if (!this._updating) {

      this.fire('error', arg);
    }
  };

  var internalUpdateListener = function() {

    if (!this._updating) {

      // Defensive copy external wires
      var externalWires = {};
      for (var pin in this._pinNames) {

        // Copy external wire, if exists
        if (hasOwnProperty(this._externalWires, pin)) {

          externalWires[pin] = this._externalWires[pin];
        }
      }

      // Handle successful run
      if (!this.error()) {

        // Copy values from internal wires to external wires
        for (var pin in this._pinNames) {

          if (hasOwnProperty(externalWires, pin)) {

            var obj = {};
            for (var name in this._internalWires) {

              obj[name] = this._internalWires[name][pin].value();
            }

            externalWires[pin].value(obj);
          }
        }
      }
    }
  };

  var disconnect = function(pin) {

    // Disconnect from wire, if any
    if (hasOwnProperty(this._externalWires, pin)) {

      var wire = this._externalWires[pin];
      wire.unbind(this, pin);
      delete this._externalWires[pin];

      // Fire disconnect event
      this.fire('disconnect', {pin: pin, wire: wire});
    }
  };

  var init = function() {

    // Collect valid pin names in a hash
    this._pinNames = {};
    var pins = this._factory();
    for (var pin in pins) {

      this._pinNames[pin] = this._pinNames;
    }

    // Create internal update listener
    this._internalUpdateListener = internalUpdateListener.bind(this);

    // Create internal error listener
    this._internalErrorListener = internalErrorListener.bind(this);
  };

  function ObjectRepeatBox(hash) {

    EventEmitter.call(this);

    this._factory = hash.factory;
    this._externalWires = {};
    this._internalWires = {};
    this._internalBlocks = {};
    this._updateQueue = new Queue();

    init.call(this);
  };

  extendClass(EventEmitter, ObjectRepeatBox);
  var P = ObjectRepeatBox.prototype;
  P.error = function() {

    if (hasOwnProperty(this, '_lastError')) {

      return this._lastError;
    }
    else {

      // Iterate through blocks and check for errors
      for (var name in this._internalBlocks) {

        // Check block for error
        if (this._internalBlocks[name].error()) {

          return this._internalBlocks[name].error();
        }
      }
    }
  };

  P.connect = function(pin, wire) {

    // Throw error if pin does not exist
    if (!hasOwnProperty(this._pinNames, pin)) {

      throw new Error('Pin "' + pin + '" not found');
    }

    // Do nothing if the pin is already connected to the wire
    if (this._externalWires[pin] !== wire) {

      // Disconnect from old wire, if any
      disconnect.call(this, pin);

      // Record new wire
      this._externalWires[pin] = wire;

      // Bind pin to wire
      wire.bind(this, pin);

      // Fire connect event
      this.fire('connect', {pin: pin, wire: wire});

      // Process wire value
      this.update(pin);
    }
  };

  P.disconnect = function(pin) {

    // Disconnect from wire, if any
    if (hasOwnProperty(this._externalWires, pin)) {

      var wire = this._externalWires[pin];
      wire.unbind(this, pin);
      delete this._externalWires[pin];

      // Process wire value
      this.update(pin);

      // Fire disconnect event
      this.fire('disconnect', {pin: pin, wire: wire});
    }
  };

  P.update = function(pin) {

    try {

      // A connected wire value changed

      // Check updating flag
      if (this._updating) {

        // Add update to queue and return
        this._updateQueue.push(pin);
        return;
      }
      else {

        this._updating = true; // Set updating flag
      }

      // Main loop
      var iterations = 1;
      while (true) {

        // Check iteration count
        if (iterations++ > maxIterations()) {

          throw new Error('Infinite loop detected: reached '
            + maxIterations() + ' iterations');
        }

        // Defensive copy external wires
        var externalWires = {};
        for (var name in this._pinNames) {

          // Copy external wire, if exists
          if (hasOwnProperty(this._externalWires, name)) {

            externalWires[name] = this._externalWires[name];
          }
        }

        // Get updated pin value
        var value;
        if (hasOwnProperty(externalWires, pin)) {

          value = externalWires[pin].value();
        }
        else {

          value = getUndefined();
        }

        // Fire update event
        this.fire('update', {pin: pin, value: value});

        // Fire error if value is not an object
        if (isObject(value)) {

          // Clear last error
          delete this._lastError;

          // Copy each property of new pin value to an internal wire
          var newInternalWires = {};
          var newInternalBlocks = {};
          for (var name in value) {

            // Add properties to newInternalWires and newInternalBlocks
            if (hasOwnProperty(this._internalBlocks, name)) {

              // Recycle existing block
              newInternalWires[name] = this._internalWires[name];
              newInternalBlocks[name] = this._internalBlocks[name];
            }
            else {

              // Create new circuit
              var pins = this._factory();

              // Add _internalUpdateListener to newly created pins
              for (var pinName in pins) {

                pins[pinName].on('value', this._internalUpdateListener);
              }

              // Create block
              var block = new BlackBox({pins: pins});

              // Add _internalErrorListener to newly created block
              block.on('error', this._internalErrorListener);

              // Add new wires and block
              newInternalWires[name] = pins;
              newInternalBlocks[name] = block;
            }

            // Copy value to appropriate internal wire
            newInternalWires[name][pin].value(value[name]);
          }

          // Delete extra blocks and wires
          for (var name in this._internalBlocks) {

            if (!hasOwnProperty(value, name)) {

              var pins = this._internalWires[name];
              var block = this._internalBlocks[name];

              // Remove _internalErrorListener from block
              block.off('error', this._internalErrorListener);

              for (var pinName in pins) {

                // Remove _internalUpdateListener from pins
                pins[pinName].off('value', this._internalUpdateListener);

                // Disconnect wires from block
                block.disconnect(pinName);
              }
            }
          }

          this._internalWires = newInternalWires;
          this._internalBlocks = newInternalBlocks;

          // Handle successful run
          if (this.error()) {

            this.fire('error', this.error()); // Fire event
          }
          else {

            // Copy values from internal wires to external wires
            for (var pinName in this._pinNames) {

              if (hasOwnProperty(externalWires, pinName)) {

                var obj = {};
                for (var name in newInternalWires) {

                  obj[name] = newInternalWires[name][pinName].value();
                }

                externalWires[pinName].value(obj);
              }
            }

            // Fire event
            this.fire('success');
          }
        }
        else {

          this._lastError = new Error('Pin ' + pin + ' must be an object');
          this.fire('error', this.error()); // Fire event
        }

        // Process update queue
        if (this._updateQueue.isEmpty()) {

          // Unset updating flag and return
          this._updating = false;
          return;
        }
        else {

          pin = this._updateQueue.next(); // Get next updated pin from queue
        }

        // Restart loop
      }
    }
    catch (err) {

      // Unset updating flag
      this._updating = false;
      throw err;
    }
  };

  P.pins = function() {

    // Collect pins in an array
    var arr = [];
    for (var pin in this._pinNames) {

      arr.push({pin: pin, wire: this._externalWires[pin]});
    }

    // Return array iterator
    return new ArrayIterator(arr);
  };

  P.blocks = function() {

    // Collect blocks into an array
    var arr = [];
    for (var name in this._internalBlocks) {

      arr.push({block: this._internalBlocks[name], key: name});
    }

    // Return array iterator
    return new ArrayIterator(arr);
  };

  P.block = function(prop) {

    // Return block
    return this._internalBlocks[prop];
  };

  return ObjectRepeatBox;
}(this.EventEmitter,
  this.extendClass,
  this.Queue,
  this.isObject,
  this.BlackBox,
  this.getUndefined,
  this.hasOwnProperty,
  this.ArrayIterator,
  this.maxIterations));

  }.call(inner, host));

  // Expose only public classes and functions on LiveBlocks module
  var expose = [
    'ArrayRepeatBox',
    'AsyncTimer',
    'BlackBox',
    'Clock',
    'ClockedBlock',
    'ImmediateBlock',
    'IntervalTimer',
    'ManualTimer',
    'ObjectRepeatBox',
    'TimedBlock',
    'Wire',
    'maxIterations',
  ];
  (function(inner, arr) {

    for (var i = 0; i < arr.length; i++) {

      this[arr[i]] = inner[arr[i]];
    }
  }.call(this, inner, expose));
}.call(this.LiveBlocks, this));

