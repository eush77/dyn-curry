'use strict';


var curry = function curry(fn, fixedArgs) {
  return function () {
    var args = fixedArgs.concat([].slice.call(arguments));
    var value = fn.apply(null, args);
    return (value === dynCurry) ? curry(fn, args) : value;
  };
};


var dynCurry = curry(function (context, fn) {
  if (arguments.length < 2) {
    if (typeof context == 'function') {
      fn = context;
      context = null;
    }
    else {
      return dynCurry;
    }
  }
  else if (context != null) {
    fn = fn.bind(context);
  }

  return curry(fn, []);
}, []);


module.exports = dynCurry;
