# React

React is at least the following things
- a framework to abstract JS DOM interactions (through APIs like `document.getElementById` and `document.createElement`)
- a framework that utilises [JSX](https://jsx.github.io/) to make the javascript you write look more like HTML
- a framework that adopts a uni-directional data flow to make life simple

It takes the tedium out of creating HTML in your JS, and provides a whole heap of benefits...

## Step 1 - JS to JSX (and introducing React)

- Start this step of the tutorial **from the root of this repo**
  - ```STEP=react npm start```
  - This will start (via npm) the webpack dev-server, and point it at the `react.js` script in this folder
  - It will output `bundle.js` which is referenced in the `index.html` document in the root of the repo
  - Note that all the tutorial steps from now on use the same HTML document!
- Open `react.js` in your editor, observe the nasty vanilla JS needed to create the desired HTML markup


### React (not sure about order yet, just capturing the ideas to cover)
 - introduce unidirectional data flow (onclick invokes event handler, calls setState, triggers a re-render)
 - basic use of React/JSX to render some UI
 - Babel transpilation (JS is what is shipped to browser, inspect in dev tools)
 - Components as classes
 - Build a single component (UI), make it a click counter (STATE)

### React without redux
 - make a list of tiles, with a bar below. Bar below says "you are watching x". Update "x" when tiles clicked. Highlight tile x (will force all other tiles to update their state)?
 - show components become coupled when onClick is passed in as prop from parent (One component influences state of other components)



## More info

The official [React Quick Start](https://facebook.github.io/react/docs/hello-world.html) is really good