// const React = require('react')
// const ReactDOM = require('react-dom')

const myNewHTML = document.createElement('div')
const newSpan = document.createElement('span')
const textNode = document.createTextNode('Hello World native JS stylee')
newSpan.appendChild(textNode)
myNewHTML.appendChild(newSpan)

/*
Target markup
<div id="app">
  <div>
    <span>Hello World React stylee</span>
  </div>
</div>
*/

document.getElementById('app').appendChild(myNewHTML)

// ReactDOM.render(
//   <div/>,
//   document.getElementById('app')
// )
