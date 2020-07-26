module.exports = function substitute(string, obj) {
  return string.replace(/\{(.+?)\}/g, function(a, b) {
    return obj[b] || ''
  })
}
