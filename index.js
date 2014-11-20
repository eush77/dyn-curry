'use strict';


var dynCurry = function (fn, context) {
  if (context != null) {
    fn = fn.bind(context);
  }
  return curry(fn, []);
};


var curry = function curry(fn, fixedArgs) {
  return function () {
    var args = fixedArgs.concat([].slice.call(arguments));
    var value = fn.apply(null, args);
    return (value === dynCurry) ? curry(fn, args) : value;
  };
};


module.exports = dynCurry;
