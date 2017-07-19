# React

React is at least the following things
- a framework to abstract JS DOM interactions (through APIs like `document.getElementById` and `document.createElement`)
- a framework that utilises [JSX](https://jsx.github.io/) to make the javascript you write look more like HTML
- a framework that adopts a uni-directional data flow to make life simple

It takes the tedium out of creating HTML in your JS, and provides a whole heap of benefits...

## Step 1 - JS to JSX and back again (and introducing React)

- Start this step of the tutorial **from the root of this repo**
  - ```STEP=react npm start```
  - This will start (via npm) the webpack dev-server, and point it at the `react.js` script in this folder
  - It will output `bundle.js` which is referenced in the `index.html` document in the root of the repo
  - Note that all the tutorial steps from now on use the same HTML document!
- Open `react.js` in your editor, observe the nasty vanilla JS needed to create the desired HTML markup

Now it's time to rewrite that native JS into JSX, and let React render it to the DOM for you
- Uncomment the require statements at the start of `react.js` (webpack will take care of bundling these into your app!)
- Uncomment the code block at the end of `react.js`
- Start writing some [JSX](https://facebook.github.io/react/docs/introducing-jsx.html) to replace the creation of DOM elements in native JS
  - Observe the webpack dev server output! *Module parse failed: You may need an appropriate loader to handle this file type.*

JSX is not real code! If we try and execute in our browser it will fail. We need to *transpile* it into normal JS that the browser understands
- Uncomment the *module* key in the webpack config to turn on JSX transpilation
  - This uses the [babel-loader](https://github.com/babel/babel-loader) webpack plugin to perform the transpilation
- restart the webpack dev server
- use your dev tools to see how your JSX markup has been transformed into real code (generally into `React.createElement()` statements)

Now finish knocking up the target HTML in JSX/React...

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
