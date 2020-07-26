var E = require('./util/Errors').GenericError,
  ErrorDetails = function ErrorDetails(badStart, badEnd, index) {
    return {
      index: '' + index,
      who: badStart && badEnd ? 'start, end' : badStart ? 'start' : 'end',
      verb: badStart && badEnd ? 'are' : 'is'
    }
  }

function DateEvent(details, index) {
  var badStart, badEnd, ED = function() {
      return ErrorDetails(badStart, badEnd, index)
    },
    start = details.start,
    end = details.end

  badStart = badEnd = false

  if (badStart = isNaN(start), badEnd = isNaN(end), badStart || badEnd) {
    throw E('event #{index} {who} {verb} not a number', ED())
  }
  if (badStart = start < 0, badEnd = end < 0, badStart || badEnd) {
    throw E('event #{index} {who} {verb} out of bound (too small)', ED())
  }
  if (badStart = start > 720, badEnd = end > 720, badStart || badEnd) {
    throw E('event #{index} {who} {verb} out of bound (too big)', ED())
  }
  if (badStart = start % 1 !== 0, badEnd = end % 1 !== 0, badStart || badEnd) {
    throw E('event #{index} {who} {verb} not an integer', ED())
  }
  if (start >= end) {
    throw E('event #{index} ends before it starts', {
      index: '' + index
    })
  }


  this.start = start
  this.end = end
  this.index = index

}

DateEvent.prototype.isInRange = function(min, max) {
  var start = this.start,
    end = this.end
    //reverse logic is simpler and better
  if (max <= start) return false
  if (min >= end) return false
  return true
}

DateEvent.prototype.collides = function(event) {
  return this.isInRange(event.start, event.end)
}

module.exports = DateEvent;
