const halloWorld = require('./halloweltB')

console.log(halloWorld())

if (typeof document !== 'undefined') {
  setTimeout(
    function () {
      document.getElementById('app').innerHTML = halloWorld()
    },
    5000
  )
}
