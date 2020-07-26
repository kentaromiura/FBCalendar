var jsdom = require('jsdom'),
  fs = require('fs'),
  $,
  path = require('path')

function traverse(node, callback) {
  callback(node)
  var children = $(node.children)
  if (children) children.forEach(function(child) {
    traverse(child, callback)
  })
}

function script(script, relativePath) {
  if (script.nodeName === 'SCRIPT') {

    var content = '' + fs.readFileSync(path.normalize(relativePath + script.getAttribute(
      'src')))
    script.removeAttribute('src')
    script.setAttribute('type', 'text/javascript')
    script.textContent = content
  }

}

function parseHTML(html, relativePath, after) {
  jsdom.env({
    html: html,
    done: function(e, window) {
      global.window = window
      global.document = window.document

      window.nodeType = 'window' // since global != window, domready fails
      if (!$) $ = require('elements')

      traverse(document.documentElement, function(each) {
        script(each, relativePath)
      })
      after(document)
    }
  })
}

function start() {
  var html = fs.readFileSync('../src/index.html')
  relativePath = '../dist/'

  parseHTML(html, relativePath, function(document) {
    console.log(document.documentElement.outerHTML)
  })
}

start()
