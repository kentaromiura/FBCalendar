var substitute = require('../util/substitute'),
  $ = require('../util/getTemplate'),
  eventTemplate

function Calendar(body) {
  if (!body) throw new Error('Calendar need a body reference')
  var calendarTemplate = $('template-calendar')
  if (!eventTemplate) {
    eventTemplate = $('template-event').firstChild.innerHTML
  }

  this.element = calendarTemplate.firstChild.cloneNode(true)
  body.appendChild(this.element);
}

function draw(event, position, size, where) {
  var document = this.element.ownerDocument,
    div = document.createElement('div'),
    i = event.index

  div.innerHTML = substitute(eventTemplate, {
    index: event.index
  })
  div.style.width = size + '%'
  div.style.top = event.start + 'px'
  div.style.left = position * size + '%'
  div.style.height = (event.end - event.start) + 'px'
  where.appendChild(div)
}

Calendar.prototype.plot = function plot(dateEvents) {
  var groups = dateEvents.groups,
    context = this,
    document = context.element.ownerDocument,
    fragment = document.createDocumentFragment(),
    target = this.element.firstChild

  //Clean the calendar
  target.innerHTML = ''

  if (groups.length) {

    groups.forEach(function(group) {
      var maxSize = 1,
        positions = {}
        // for each event I use a brute-force algorithm to find out the positions
        // starting from position 0 incrementing until it not collides anymore.
      group.forEach(function(event) {
          var index = 0,
            done = false
          while (!done) {
            var position = positions[index] || (positions[index] = [])
            if (position.some(function(plottedEvent) {
                return plottedEvent.collides(event)
              })) {
              index++
            } else {
              maxSize = Math.max(maxSize, index + 1)
              event.position = index
              position.push(event)
              done = true
            }
          }
        })
        //maxSize here is the maximum position used inside this group, I have now all the information to correctly draw the events
      group.forEach(function(event) {
        draw.call(context, event, event.position, 100 / maxSize,
          fragment)
      })
    })
  }

  target.appendChild(fragment)
}

module.exports = Calendar
