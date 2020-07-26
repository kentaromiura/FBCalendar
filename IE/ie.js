if (!document.head) {
  document.head = document.getElementsByTagName('head')[0]
}
if (![].forEach) {
  Array.prototype.forEach = function(callback) {
    for (var i = 0, max = this.length; i < max; i++) {
      callback(this[i], i)
    }
  }
}
if (![].some) {
  Array.prototype.some = function(callback) {
    for (var i = 0, max = this.length; i < max; i++) {
      if (callback(this[i], i)) return true
    }
    return false
  }
}
if (![].map) {
  Array.prototype.map = function(callback) {
    var output = []
    for (var i = 0, max = this.length; i < max; i++) {
      output.push(callback(this[i], i))
    }
    return output
  }
}
