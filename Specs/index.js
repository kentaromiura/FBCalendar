var expect = require('expect.js')
var DateEvent = require('../src/DateEvent')
var DateEvents = require('../src/DateEVents')


function get50RandomFromMAX(MAX) {
  //var MAX = 720
  return Array.apply(null, Array(50)).map(function() {
    var start = Math.floor(Math.abs(Math.random() * (MAX - 2))),
      end = 1 + start + Math.floor(Math.abs(Math.random() * (MAX - start)))

    return {
      start: start,
      end: end
    }
  })
}

function getRandom50and50() {
  return get50RandomFromMAX(720 / 2).concat(get50RandomFromMAX(720));
}

function getRandom100() {
  return Array.apply(null, Array(100)).map(function() {
    var start = Math.floor(Math.abs(Math.random() * 718)),
      end = 1 + start + Math.floor(Math.abs(Math.random() * (720 - start)))

    return {
      start: start,
      end: end
    }
  })
}
describe("Utils", function() {
  describe("alias", function() {
    var alias = require('../src/util/alias')
    it('should allow me to alias array methods', function() {
      var each = alias([].forEach),
        sum = 0;
      each({
        length: 2,
        0: 1,
        1: 2
      }, function(x) {
        sum += x
      })
      expect(sum).to.be(3)
    })
  })
  describe("Errors", function() {
    var Errors = require("../src/util/Errors").GenericError
    it("should return an Error message formatted with the parameters",
      function() {
        expect(Errors("foo {bar}", {
          bar: 'baz'
        }).message).to.be("foo baz")
      })
  })
  describe("getTemplate", function() {
    var getTemplate = require('../src/util/getTemplate')
    it('should get a template object', function() {
      var doc
      if (global.document) doc = global.document
      global.document = {
        getElementById: function() {
          return {
            content: 'foo'
          }
        }
      }
      expect(getTemplate('blah')).to.be('foo')
      if (doc) global.document = doc
    })
  })
  describe("isArray", function() {
    var isArray = require('../src/util/isArray')
    it('should return if something is an Array or not', function() {
      expect(isArray([])).to.be(true)
      expect(isArray({})).to.be(false)
      expect(isArray(undefined)).to.be(false)
      expect(isArray(null)).to.be(false)
      expect(isArray("string")).to.be(false)
    })
  })
  describe("substitute", function() {
    var substitute = require('../src/util/substitute')
    it(
      "should substitute tokens in a string using the option object provided",
      function() {
        expect(substitute("foo {bar} {baz}", {
          bar: '1',
          baz: 2
        })).to.be('foo 1 2')
      })
    it(
      "should substitute tokens in a string using empty string if is not in the option object provided",
      function() {
        expect(substitute("foo {bar} {baz}", {
          bar: '1'
        })).to.be('foo 1 ')
      })
  })
})
describe("DateEvents", function() {
  it('should not allow non Array arguments', function() {
    try {
      new DateEvents()
    } catch (O_o) {
      expect(O_o.message).to.be('DateEvents expect an Array')
    }
  })
  it('should allow an empty array to clear the day', function() {
    var test = new DateEvents([])
    expect(test.groups.length).to.be(1)
    expect(test.groups[0].length).to.be(0)
  })
  it('should store a groupified Array', function() {
    var data = [{
      start: 0,
      end: 100
    }, {
      start: 0,
      end: 50
    }, {
      start: 0,
      end: 50
    }, {
      start: 50,
      end: 100
    }]

    expect(new DateEvents(data).groups.length).to.be(1)
    var data2 = [{
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

    var test = new DateEvents(data2)
    expect(test.groups.length).to.be(2)
    expect(test.groups[0].length).to.be(1)
    expect(test.groups[1].length).to.be(3)
  })
})
describe("Should pass stress test", function() {
  it('should not break on this test', function() {
    var ok = true
    try {
      global.layOutDay(getRandom100())
      global.layOutDay(getRandom50and50())
    } catch (O_o) {
      ok = false
    }
    expect(ok).to.be.ok()
  })
  it("should throw on non Array", function() {
    var nonArrays = [
      NaN, null, undefined, {}, "", //g
    ]
    nonArrays.forEach(function(test) {
      var ok = false;
      try {
        global.layOutDay(test)
      } catch (O_o) {
        ok = true
      }
      expect(ok).to.be.ok()
    })
  })
})
describe("Global function layOutDay", function() {
  require('../src/index')
  it('layOutDay must exists', function() {
    expect(global.layOutDay).to.be.ok()
  })
  it('layOutDay should treat his argument as readonly', function() {
    var events = [{
      start: 10,
      end: 20
    }, {
      start: 0,
      end: 20
    }];
    layOutDay(events);
    var test = [{
      start: 10,
      end: 20
    }, {
      start: 0,
      end: 20
    }]
    expect(test[0].start).to.equal(events[0].start)
    expect(test[1].start).to.equal(events[1].start)
  })
  it('layOutDay should allow passing an empty array', function() {
    var ok = true
    try {
      global.layOutDay([])
    } catch (O_o) {
      ok = false
    }
    expect(ok).to.be.ok()
  })
})

describe("DateEvent", function() {
  describe("Inputs should be valid", function() {
    it('should not allow null, undefined', function() {
      try {
        new DateEvent({
          start: null,
          end: 1
        }, 0)
      } catch (O_o) {
        expect(O_o.message)
          .to.be('event #0 start is out of bound (too small)')
      }
    })

    it('should raise a negative out of bound exception', function() {
      try {
        new DateEvent({
          start: -1,
          end: 0
        }, 0)
      } catch (O_o) {
        expect(O_o.message)
          .to.be('event #0 start is out of bound (too small)')
      }
      try {
        new DateEvent({
          start: -12,
          end: -1
        }, 1)
      } catch (O_o) {
        expect(O_o.message)
          .to.be('event #1 start, end are out of bound (too small)')
      }
      try {
        new DateEvent({
          start: 0,
          end: -1
        }, 2)
      } catch (O_o) {
        expect(O_o.message)
          .to.be('event #2 end is out of bound (too small)')
      }
    })

    it('should only allow numbers', function() {
      try {
        new DateEvent({
          start: 'a',
          end: 0
        }, 0)
      } catch (O_o) {
        expect(O_o.message)
          .to.be('event #0 start is not a number')
      }
      try {
        new DateEvent({
          start: {},
          end: function() {}
        }, 1)
      } catch (O_o) {
        expect(O_o.message)
          .to.be('event #1 start, end are not a number')
      }
      try {
        new DateEvent({
          start: 0,
          end: NaN
        }, 2)
      } catch (O_o) {
        expect(O_o.message)
          .to.be('event #2 end is not a number')
      }
    })

    it('should raise a positive out of bound exception', function() {
      try {
        new DateEvent({
          start: 721,
          end: 0
        }, 0)
      } catch (O_o) {
        expect(O_o.message)
          .to.be('event #0 start is out of bound (too big)')
      }
      try {
        new DateEvent({
          start: 721,
          end: 727
        }, 1)
      } catch (O_o) {
        expect(O_o.message)
          .to.be('event #1 start, end are out of bound (too big)')
      }
      try {
        new DateEvent({
          start: 0,
          end: 721
        }, 2)
      } catch (O_o) {
        expect(O_o.message)
          .to.be('event #2 end is out of bound (too big)')
      }
    })

    it('should not allow events which ends before starting', function() {
      try {
        new DateEvent({
          start: 0,
          end: 0
        }, 0)
      } catch (O_o) {
        expect(O_o.message)
          .to.be('event #0 ends before it starts')
      }
      try {
        new DateEvent({
          start: 1,
          end: 0
        }, 1)
      } catch (O_o) {
        expect(O_o.message)
          .to.be('event #1 ends before it starts')
      }
    })
    it('should not allow non integer values', function() {
      try {
        new DateEvent({
          start: 1.01,
          end: 2
        }, 0)
      } catch (O_o) {
        expect(O_o.message)
          .to.be('event #0 start is not an integer')
      }
      try {
        new DateEvent({
          start: 1.01,
          end: 1.02
        }, 1)
      } catch (O_o) {
        expect(O_o.message)
          .to.be('event #1 start, end are not an integer')
      }
      try {
        new DateEvent({
          start: 12,
          end: 13.1
        }, 2)
      } catch (O_o) {
        expect(O_o.message)
          .to.be('event #2 end is not an integer')
      }
    })
  })

  var dataSample = [{
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
}];

  describe("DateEvent should reflect the data passed", function() {
    var dateEvents = dataSample.map(function(details, index) {
      return new DateEvent(details, index)
    })

    it('should have the same values as the source', function() {
      dateEvents.forEach(function(event, index) {
        expect(event.start == dataSample[index].start)
          .to.be.ok()
        expect(event.end == dataSample[index].end)
          .to.be.ok()
      })
    })

    it('should sets some defaults values', function() {
      dateEvents.forEach(function(event, index) {
        expect(event.index == index)
          .to.be.ok()
      })
    })
  })

  describe('should handle collision fine', function() {
    var test = new DateEvent({
      start: 50,
      end: 100
    })

    it('should collide at the top', function() {
      expect(test.isInRange(0, 70))
        .to.be(true)
        //if one ends just before the other starts they don't collides
      expect(test.isInRange(0, 51))
        .to.be(true)
      expect(test.isInRange(0, 50))
        .to.be(false)
    })
    it('should collide at the bottom', function() {
      expect(test.isInRange(70, 120))
        .to.be(true)
      expect(test.isInRange(99, 120))
        .to.be(true)
      expect(test.isInRange(100, 120))
        .to.be(false)
    })
    it('should collide by containing', function() {
      expect(test.isInRange(60, 80))
        .to.be(true)
    })
    it('should collide by being contained', function() {
      expect(test.isInRange(0, 150))
        .to.be(true)
    })
    it('should collide if it is the same timespan', function() {
      expect(test.isInRange(50, 100))
        .to.be(true)
    })
    it('should not collide with preceding items', function() {
      expect(test.isInRange(0, 49))
        .to.be(false)
    })
    it('should not collide with items after', function() {
      expect(test.isInRange(101, 200))
        .to.be(false)
    })
  })
  describe('should handle collision between events', function() {
    it('should collide', function() {
      var test = new DateEvent({
        start: 50,
        end: 100
      })
      var collidesTop = new DateEvent({
        start: 0,
        end: 51
      })
      var collidesBottom = new DateEvent({
        start: 99,
        end: 101
      })
      expect(test.collides(test)).to.be(true)
      expect(test.collides(collidesTop)).to.be(true)
      expect(test.collides(collidesBottom)).to.be(true)
    })
    it('shold not collide', function() {
      var test = new DateEvent({
        start: 50,
        end: 100
      })
      var notCollidesTop = new DateEvent({
        start: 0,
        end: 50
      })
      var notCollidesBottom = new DateEvent({
        start: 100,
        end: 101
      })
      expect(test.collides(notCollidesTop)).to.be(false)
      expect(test.collides(notCollidesBottom)).to.be(false)
    })
  })
})
describe("Strategies", function() {
  STRATEGIES = require("../src/strategies")
  it(
    "sortFirstEventsFirst should sort first event that starts first and when they start at the same time it should place the one that ends after first",
    function() {
      var array = [{
        start: 50,
        end: 100
      }, {
        start: 50,
        end: 80
      }, {
        start: 0,
        end: 100
      }].sort(STRATEGIES.sortFirstEventsFirst)
      expect(array[0].start).to.be(0)
      expect(array[1].end).to.be(100)
    })
  it(
    "promoteTo should return a builder that instantiate an object of the constructor passed, the builder accept 2 arguments and it will pass it to the constructor",
    function() {
      function Test(a, b) {
        this.a = a;
        this.b = b
      }
      var toTest = STRATEGIES.promoteTo(Test)
      expect(toTest.length).to.be(2)
      var instance = toTest({
        foo: 'bar'
      }, 'baz')
      expect(instance instanceof Test).to.be(true)
      expect(instance.a.foo).to.be('bar')
      expect(instance.b).to.be('baz')
    })
})
