'use strict';

describe('base64Stripped service', function() {

  beforeEach(module('instant-codec'));

  var codec;
  beforeEach(inject(['base64Stripped', function(base64Stripped) {

    codec = base64Stripped;
  }]));

  it('.encode() function removes base64 padding', function() {

    expect(codec.encode('abcdef==')).toBe('abcdef');
    expect(codec.encode('abcdefg=')).toBe('abcdefg');
    expect(codec.encode('abcdefgh')).toBe('abcdefgh');
  });

  it('.decode() function adds base64 padding', function() {

    expect(codec.decode('abcdef')).toBe('abcdef==');
    expect(codec.decode('abcdefg')).toBe('abcdefg=');
    expect(codec.decode('abcdefgh')).toBe('abcdefgh');
  });
});

