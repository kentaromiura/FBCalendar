/*
  this allows me to save a reference, so instead of typing [].forEach.call(foo, bar), [].forEach.call(baz, moo)
  I can just do var forEach = alias([].forEach), forEach(foo, bar), forEach(baz, moo)
*/
module.exports = function alias(fn) {
  return fn.call.bind(fn)
}
