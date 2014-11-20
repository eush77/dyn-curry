# dyn-curry [![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david]

[![npm](https://nodei.co/npm/dyn-curry.png)](https://nodei.co/npm/dyn-curry/)

[travis]: https://travis-ci.org/eush77/dyn-curry
[travis-badge]: https://travis-ci.org/eush77/dyn-curry.svg
[david]: https://david-dm.org/eush77/dyn-curry
[david-badge]: https://david-dm.org/eush77/dyn-curry.png

## [What](https://www.npmjs.org/search?q=curry)? [Yet](https://www.npmjs.org/package/curry) [another](https://www.npmjs.org/package/dot-curry) [currying](https://www.npmjs.org/package/curry-di) [module](https://www.npmjs.org/package/underscorify)?

Yes, but this time it is quite different.

Usually [currying](https://en.wikipedia.org/wiki/Currying) routines use [`fn.length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length) to determine how far the currying should go. This is rather restricting.

[Some](https://www.npmjs.org/package/curry-di) [other](https://www.npmjs.org/package/underscorify) modules do something trickier than that, but you still can't effect their choices from inside a function being curried.

## Gain full control

### curry = require('dyn-curry')
### curry([ctx], fn)

Returns a wrapper function.

Inside `fn`, return `curry` to indicate that the function needs more arguments. It shouldn't usually produce any side effects, because the wrapper will be called each time new chunk of arguments is supplied. Return fast.

Finally, `curry` is curried itself! If the first argument is not a function, it will wait for the function to come. (Be careful: if the context is a function indeed, you should pass all of the arguments at once, no currying will happen — sorry!)

## Examples

### Optional arguments

```js
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

hello('Hello!'); // "Hello!"
hello({ suffix: ' Nice jacket!' }); // function
hello({ suffix: ' Nice jacket!' })('Hello!'); // "Hello! Nice jacket!"
```

### Simulating traditional currying

```js
var add = curry(function (a, b) {
  if (arguments.length < 2) {
    return curry;
  }
  return a + b;
});

add(); // function
add(1); // function
add(1, 2); // 3
```

### String concatenation

```js
var makeSentence = curry(function () {
  var last = arguments[arguments.length - 1];
  if (typeof last != 'string' || last[last.length - 1] != '.') {
    // Curry until the sentence ends.
    return curry;
  }
  return [].join.call(arguments, ' ');
});

var sentence = makeSentence('Master', 'Foo'); // function
sentence = sentence('was', 'iterating'); // function
sentence = sentence('along', 'the', 'beach.'); // finally, a string
```

### Blackjack

```js
var blackjack = curry(function () {
  var value = [].reduce.call(arguments, function (a, b) {
    return a + b;
  }, 0);
  return (value < 21) ? curry : value;
});

blackjack(10); // function
blackjack(10)(11); // 21
blackjack(10)(5, 3)(2, 1); // 21
blackjack(42); // 42
```

## Install

```shell
npm install dyn-curry
```

## License

MIT
