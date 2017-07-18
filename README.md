# React-Redux Primer

**What**
One (of many) getting started guides for React Redux?

**Why?**
On a recent work project I started my team down the path of adopting these tools in production. This tutorial is a resource to get those in my team (and in collaborating teams) up to a shared useful base level of understanding of these tools, so we can collaborate and learn together. It assumes *almost zero* prior exposure to React/Redux (and *nearly zero* exposure to client side JS development)

It *does not* aim to be an exhaustive documentation resource for those tools (I'll link out to better docs where appropriate), nor does it promise to offer **the best way** to solve the problems/areas covered...

## How to play along

Cover here how to use this resource.

ideas
- start dev server with env variable that changes the entry point. Different entry point per step (means tutorial includes working code)
- only minimal working code, get to final step together (how would you use this resource solo?)
- branch(es) with answers, use compare/x...y to see the incremental changes

## What is covered

### Webpack
 - JS script in page (drawing some DOM, maybe with a setTimeout)
 - Why do we split scripts? Why require not multiple <script> tags?
 - No require in the browser
 - Webpack is a bundler, myApp.js -> bundle.js

### Webpack dev server
 - hot reloading

### React (not sure about order yet, just capturing the ideas to cover)
 - introduce unidirectional data flow (onclick invokes event handler, calls setState, triggers a re-render)
 - basic use of React/JSX to render some UI
 - Babel transpilation (JS is what is shipped to browser, inspect in dev tools)
 - Components as classes
 - Build a single component (UI), make it a click counter (STATE)

### React without redux
 - make a list of tiles, with a bar below. Bar below says "you are watching x". Update "x" when tiles clicked. Highlight tile x (will force all other tiles to update their state)?
 - show components become coupled when onClick is passed in as prop from parent (One component influences state of other components)

### Redux
 - re-introduce unidirectional data flow (onclick dispatches action, calls reducer, triggers a re-render)
 - connect up tiles and watching bar from previous example

### Action creators
 - make two tiles, show they duplicate creation of action, refactor into action creator

### Async/side-effects
 - extend unidirectional data flow model (onclick invokes action creator, action creator dispatches async action creator which dispatches action when done, calls reducer, triggers re-render)
 - make content of tiles come from iPlayer home section network call (do we need home/categories buttons to trigger the network request?)

### Middleware
 - extend unidirectional data flow model to show where middleware fits in
 - go through using this for telemetry, stats, route changes in search module

### Re-select
 - create anther type of tile, observe how parsing state is duplicated. Refactor to use re-select
 - show diffs from drum machine to how this is critical in more complex app
