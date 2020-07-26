var substitute = require('../util/substitute'),
  $ = require('../util/getTemplate')

function YardStick(body) {
  if (!body) throw new Error('YardStick need a body reference')
  var yardStickTemplate = $('template-yardstick').cloneNode(true),
    main = yardStickTemplate.children[0].cloneNode(true),
    hour = yardStickTemplate.children[1],
    hourHTML = hour.innerHTML,
    halfHour = yardStickTemplate.children[2],
    halfHourHTML = halfHour.innerHTML

  for (var i = 9; i < 21; i++) {
    var h = hour.cloneNode()
    h.innerHTML = substitute(hourHTML, {
      time: i % 12 || 12,
      meridian: i < 12 ? 'AM' : 'PM'
    })
    main.appendChild(h)
    var hh = halfHour.cloneNode()
    hh.innerHTML = substitute(halfHourHTML, {
      time: i % 12 || 12
    });
    main.appendChild(hh)
  }
  var last = hour.cloneNode();
  last.setAttribute('class', last.getAttribute('class') + ' last');
  last.innerHTML = substitute(hourHTML, {
    time: 9,
    meridian: 'PM'
  })
  main.appendChild(last)
  body.appendChild(main)

}
module.exports = YardStick
