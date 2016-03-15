var remote = require('remote')
var path = require('path')

var prevhash = localStorage.getItem('location')
if (location.hash) localStorage.setItem('location', location.hash)
else if (prevhash) location.hash = prevhash

window.addEventListener('hashchange', function (ev) {
  localStorage.setItem('location', location.hash)
})

var serverUrl = 'http://' + require('remote').getGlobal('osmServerHost')


id = iD()
  .presets({
    presets: require('../node_modules/iD/data/presets/presets.json'),
    defaults: require('../node_modules/iD/data/presets/defaults.json'),
    categories: require('../node_modules/iD/data/presets/categories.json'),
    fields: require('../node_modules/iD/data/presets/fields.json')
  })
  .imagery(require('../node_modules/iD/data/imagery.json'))
  .taginfo(iD.services.taginfo())
  .assetPath('vendor/iD/')
  .preauth({url: serverUrl})
  .minEditableZoom(14)

d3.select('#container')
  .call(id.ui())
