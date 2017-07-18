setTimeout(
  function () {
    document.getElementById('app').innerHTML = sayHallo()
  },
  2000
)

// What if this function was super complicated and we wanted to break it out to it's own file...
function sayHallo () {
  return 'Hallo Welt!'
}
