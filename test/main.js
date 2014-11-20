'use strict';

var curry = require('..');


describe('dyn-curry', function () {
  it('should curry a function as long as it says to do so', function () {
    var blackjack = curry(function () {
      var value = [].reduce.call(arguments, function (a, b) { return a + b; }, 0);
      if (!value) {
        return NaN;
      }
      return (value < 21) ? curry : value;
    });

    blackjack().should.be.NaN;
    blackjack(10).should.be.a.Function;
    blackjack(10)(10).should.be.a.Function;
    blackjack(10)(10)(1).should.equal(21);
    blackjack(10, 10)(1, 3).should.equal(24);
    blackjack(10, 10)(1, 3, -24).should.be.NaN;
  });

  it('should produce no side effects aside from the function call', function () {
    var add = curry(function (a, b) {
      return (arguments.length < 2) ? curry : a + b;
    });

    var add3 = add(3);
    add3(4).should.equal(7);
    add3(5).should.equal(8);
  });

  it('should accept an optional context', function () {
    var obj = {
      data: 77,
      get: function (message) {
        return (message == null) ? curry : message + ': ' + this.data;
      }
    };

    curry(obj, obj.get).should.be.a.Function;
    curry(obj, obj.get)()()().should.be.a.Function;
    curry(obj, obj.get)('random number').should.equal('random number: 77');
  });

  it('should itself be curried', function () {
    var temperature = {
      celsiusValue: 0,
      celsius: function () { return this.celsiusValue; },
      fahrenheit: function () { return 32 + this.celsiusValue * 9 / 5; }
    };

    curry(temperature)(temperature.celsius)().should.equal(0);
    curry(temperature)(temperature.fahrenheit)().should.equal(32);
  });
});
