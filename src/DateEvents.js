var DateEvent = require('./DateEvent'),
  STRATEGIES = require('./strategies'),
  isArray = require('./util/isArray')

function DateEvents(events) {
  if (!isArray(events)) throw new Error('DateEvents expect an Array')

  this.groups = groupify(events.map(STRATEGIES.promoteTo(DateEvent))
    .sort(STRATEGIES.sortFirstEventsFirst))
}

function groupify(ungrouped) {
  var output = [
            []
        ],
    index = 0,
    currentGroup = output[index]

  if (ungrouped.length) {

    currentGroup.push(ungrouped.shift())
    while (ungrouped.length) {

      while (ungrouped.length && currentGroup[index].collides(ungrouped[
          0])) {
        var next = ungrouped.shift()
        currentGroup.push(next)
      }

      if (index < currentGroup.length - 1) {
        index++
      } else {
        if (ungrouped.length) {
          currentGroup = []
          index = 0
          output.push(currentGroup)
          currentGroup.push(ungrouped.shift())
        }
      }
    }
  }
  return output
}
module.exports = DateEvents
