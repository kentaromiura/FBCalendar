module.exports = function(id) {
  var template = document.getElementById(id)
  return template.content || template
}
