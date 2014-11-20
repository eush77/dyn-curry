'use strict';

var curry = require('..');


describe('dyn-curry', function () {
  it('should curry a function as long as it says to do so', function () {
    var sumAmount = curry(function (count) {
      if (count == null || arguments.length < count + 1) {
        return curry;
      }

      var numbers = [].slice.call(arguments, 1, count + 1);
      var sum = numbers.reduce(function (a, b) {
        return a + b;
      }, 0);
      return sum;
    });

    sumAmount().should.be.a.Function;
    sumAmount(0).should.equal(0);
    sumAmount(1).should.be.a.Functions;
    sumAmount(1)(2).should.equal(2);
    sumAmount()(2).should.be.a.Function;
    sumAmount(2)(3, 4).should.equal(7);
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
