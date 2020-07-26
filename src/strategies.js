var STRATEGIES = {}

/*
  this will sort events so that event on the left are always starting first,
  if two events start at the same time, the *longer* will be at the left
*/
STRATEGIES.sortFirstEventsFirst = function sortFirstEventsFirst(a, b) {
  if (a.start < b.start) return -1
  if (a.start == b.start && a.end > b.end) return -1
  return a.start == b.start && a.end == b.end ? 0 : 1
}

STRATEGIES.promoteTo = function promoteTo(Constructor) {
  return function(a, i) {
    return new Constructor(a, i)
  }
}

module.exports = STRATEGIES
