var DateEvents = require('./DateEvents'),
  Calendar = require('./View/Calendar'),
  YardStick = require('./View/YardStick'),
  calendar

global.layOutDay = function layOutDay(events) {
  var dateEvents = new DateEvents(events)
  if (!calendar) { // can only happen before onload
    setTimeout(function() {
      layOutDay(events)
    }, 300)
  } else {
    calendar.plot(dateEvents)
  }
}

global.onload = function() {
  var body = document.getElementById('body'),
    requiredInput = [{
      start: 30,
      end: 150
    }, {
      start: 540,
      end: 600
    }, {
      start: 560,
      end: 620
    }, {
      start: 610,
      end: 670
    }]

  YardStick(body)
  calendar = new Calendar(body)

  layOutDay(requiredInput)
}
