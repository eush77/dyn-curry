'use strict';

var curry = require('..');


describe('examples', function () {
  describe('"String concatenation"', function () {
    it('should work as stated', function () {
      var makeSentence = curry(function () {
        var last = arguments[arguments.length - 1];
        if (typeof last != 'string' || last[last.length - 1] != '.') {
          // Curry until the sentence ends.
          return curry;
        }
        return [].join.call(arguments, ' ');
      });

      var sentence;
      (sentence = makeSentence('Master', 'Foo')).should.be.a.Function;
      (sentence = sentence('was', 'iterating')).should.be.a.Function;
      (sentence = sentence('along', 'the', 'beach.')).should.be.type('string');

      sentence.should.equal('Master Foo was iterating along the beach.');
    });
  });

  describe('"Optional arguments"', function () {
    it('should work as stated', function () {
      var hello = curry(function (options, message) {
        if (typeof options == 'string') {
          // No options - return the message.
          return options;
        }
        if (message == null) {
          // No message - curry.
          return curry;
        }
        // Both options and message - format the message and return.
        return (options.prefix || '') + message + (options.suffix || '');
      });

      hello('Hello!').should.equal('Hello!');
      hello({ suffix: ' Nice jacket!' }).should.be.a.Function;
      hello({ suffix: ' Nice jacket!' })('Hello!').should.equal('Hello! Nice jacket!');
    });
  });

  describe('"Simulating traditional currying"', function () {
    it('should work as stated', function () {
      var add = curry(function (a, b) {
        if (arguments.length < 2) {
          return curry;
        }
        return a + b;
      });

      add().should.be.a.Function;
      add(1).should.be.a.Function;
      add(1, 2).should.equal(3);
    });
  });
});
