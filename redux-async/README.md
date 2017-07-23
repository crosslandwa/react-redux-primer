# Redux and async actions

![Redux uni-directional data flow diagram](https://rawgit.com/crosslandwa/react-redux-primer/master/redux-async/ReduxUnidirectionalActionCreator2.svg)

To re-cap on the redux uni-directional data flow model:
- A **Redux store** is creating with some initial state, and bound to your React application via a **Provider** (which is subscribed to the store)
- React renders your components with the initial steps (passing state as props)
- In response to events (user input) your React components invoke **action creators** to **dispatch actions**
- The **Redux store** receives these actions, and uses **reducers** to *merge the current application state and the action to create a new application state*
- Changes to the store stare trigger a re-render of your application (via the *subscribed* **Provider**)

**Note**
We've built on the model in the [Redux tutorial section](../redux#redux-uni-directional-flow) and introduced *action creators*. At they're simplest these are simply functions that return an **action** (a plain object). The following are equivalent
```javascript
const mapDispatchToTileProps = (dispatch, ownProps) => ({
  onClick: (title) => dispatch({type: 'UPDATE_WATCHING', title: ownProps.title})
})

const updateWatchingCreator = (title) => ({type: 'UPDATE_WATCHING', title: title})
const mapDispatchToTilePropsUsingActionCreator = (dispatch, ownProps) => ({
  onClick: (title) => dispatch(updateWatchingCreator(ownProps.title))
})
```
These helps promote re-use/remove duplication where multiple components raise the same action. They are also crucial for adding aynchronous behaviour to your application (more later).

## Middleware

[Redux middleware](http://redux.js.org/docs/advanced/Middleware.html) provides a way for you to extend Redux by providing a pluggable point for you to **intercept actions** before they reach the Redux store. Middleware is **a good way** to implement **cross cutting concerns** (e.g. logging, stats reporting, access control, etc)

![Redux middleware diagram](https://rawgit.com/crosslandwa/react-redux-primer/master/redux-async/ReduxUnidirectionalMiddleware.svg)

Redux provides an *applyMiddleware* function to enhance your Redux store
```javascript
const Redux = require('redux')
const reducer = (state = {}) => state
Redux.createStore(reducer, Redux.applyMiddleware(myMiddleware))
```
In a non ES6 world, the rather clunky interface for creating middleware is:
```javascript
function myMiddleware (store) {
  return function (next) {
    return function (action) {
      // implement your middleware logic here
      return next(action) // pass on action to next middleware in the chain (or the Redux store)
    }
  }
}
```

which in ES6, via arrow functions becomes
```javascript
const myMiddleware = (store) => (next) => (action) => {
  // your middleware code here
  return next(action)
}
```

- start up the `redux-async.js` example with `STEP=redux-async npm start`
  - this is a simple synchronous counter
- write some custom middleware to `console.log` every `'INCREMENT'` action dispatched by the counter in the example
- *enhance your store* to use it
  - note the Redux dev tools are also added by enhancing the store
  - Getting this to work alongside your new middleware requires you to [compose enhancers](https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup)

## Async behaviour

Where in your application should async actions (e.g. network requests) be implemented? The Redux docs suggest ["in general, Redux suggests that code with side effects should be part of the action creation process. "](http://redux.js.org/docs/faq/Actions.html#how-can-i-represent-side-effects-such-as-ajax-calls-why-do-we-need-things-like-action-creators-thunks-and-middleware-to-do-async-behavior). Adhering to this approach lets you
- keep your components dumb (no state)
- keep your reducers functional (state + action go in, new state comes out)

These qualities make those parts of your application *easy to reason about*, and therefore simple to test...

We'll now look at how

### Actions dispatching actions with Thunk middleware...

![Redux uni-directional async data flow diagram](https://rawgit.com/crosslandwa/react-redux-primer/master/redux-async/ReduxUnidirectionalAsyncAction2.svg)

This workflow is implemented via [Redux thunk middleware](https://github.com/gaearon/redux-thunk) with the following steps
- Action creators can now create either
  - **actions**, i.e. plain objects, which will be dealt with in the normal way
  - **thunks**, which are functions
- Thunk middleware **intercepts any thunks**
  - they are not passed on to the redux store, as they *are not plain objects*
  - they are passed Redux's **dispatch** function
- Your thunk implementation can perform asynchronous actions and call **dispatch** once complete, choosing to
  - dispatch further **actions** or **thunks**
  - optionally do nothing

A **thunk** is just a function, with the following API
```javascript
function myActionCreator () {
  return function (dispatch, getState) {
    // thunk code here
    // note you can dispatch further actions/thunks by calling dispatch()
    // note you can retrieve the store state by calling getState()
  }
}
const mapDispatchToProps = (dispatch) => { doSomething: () => dispatch(myActionCreator()) }
```

- Update your synchronous counter to be asynchronous
  - Add redux-thunk middleware to your store
  - Return a **thunk** instead of an **action** from your action creator
  - Use `setTimeout` in your thunk to *dispatch an `'INCREMENT'` action* after some delay

*Note there are other ways of doing asynchronous code in Redux, e.g. [redux-saga](https://redux-saga.js.org/) but we'll stick with thunks for this tutorial*

## Task

Update your [solution from the redux tutorial](../redux#final-task) with the following modifications
- Initialise your store state with an empty array of `titles`
- Add button to your UI that when clicked loads the `data.json` file over HTTP
- Parse the titles from the loaded JSON and update your store state
- Add some middleware that logs (to console) the outgoing network request

## More info

The [Advanced section of the Redux docs](http://redux.js.org/docs/advanced/) is the place to go for (much) more detail
