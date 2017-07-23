# Redux

Redux is a framework that applies the uni-directional data flow concept to your entire application. It also plays very nicely with React giving (at least) the following benefits
- application state is stored centrally and consistently handled
  - this helps reduce coupling between related components
  - in most cases state handling can be removed completely from your React components
- the architecture scales well - almost every new feature you add can be **implemented in the same way**
  - the complexity of your application effectively scales linearly with the number of features added

## Redux Uni-directional flow

The **uni-directional data flow** concept is absolutely core here, so lets look at the basic Redux implementation:

![Redux uni-directional data flow diagram](https://rawgit.com/crosslandwa/react-redux-primer/master/redux/ReduxUnidirectional.svg)

- A **Redux store** is creating with some initial state, and bound to your React application via a **Provider** (which is subscribed to the store)
- React renders your components with the initial steps (passing state as props)
- Your React components **dispatch actions** in response to events (user input)
- The **Redux store** receives these actions, and uses **reducers** to *merge the current application state and the action to create a new application state*
- Changes to the store stare trigger a re-render of your application (via the *subscribed* **Provider**)

## Gluing React & Redux together

The [react-redux bindings](http://redux.js.org/docs/basics/UsageWithReact.html) are the glue that let your React app and Redux co-exist. The basics added are:
- a **createStore** function to initialise a Redux store
- a **Provider** React component that wraps your React application (and subscribes to the store)
- a **connect** function to let you inject store state into your components
- a **dispatch** function to let your components dispatch actions

Start the example app via `STEP=redux npm start`
- note the boiler plate code of creating a **store** and an app wrapped in a **Provider** are done for you in `redux.js`
- the boiler plate code has also connected up the Chrome [Redux dev tools](https://github.com/gaearon/redux-devtools), which should definitely install!

## Connect to the store

We're going to (re) implement a simple counter, but this time the counter state will live in the Redux store

- Initialise your store state with an initial `count` of zero
  - use the dev tools to verify your initial state
- Create a `<Counter>` component that displays the passed in `count` prop

How do we extract the `count` from the store, and pass it to `<Counter>`? Say hello to **connect**
```javascript
const ReactReduxBindings = require('react-redux')
const connect = ReactReduxBindings.connect
const ConnectedCounter = connect(mapStateToProps)(Counter)
```
The connect function
- takes a function *mapStateToProps* and returns another function
- the returned (curried) function takes a React Component, and returns a *connected Component*

### Task
Create an implementation of *mapStateToProps* to extract `count` from your store state, and pass it as a prop to the *connectedComponent*. Render your connected component in your application

The signature for *mapStateToProps* is:
```javascript
function mapStateToProps (state, ownProps) => { return {} } // return a plain object that redux will pass as (merged) props to the Component
```

## Dispatch some actions

So far we've made a component that displays some store state - lets *dispatch actions* so it starts counting

### Actions, reducers and dispatch

Actions are plain JS objects that are passed to your store's [reducer function](redux.js#L14). The signature for your reducer is:
```javascript
function reducer (state, action) { return {} } // return the next state, also a plain object
```

Your reducer implementation should calculate the **next state of your application** based on the incoming action. The **shape** of your state and actions is therefore up to you...

Redux provides a **dispatch** function that takes an action, and ultimately passes it to your *reducer*. Hooking your Components' up to dispatch is also handled via **connect**
```javascript
const action = {}
const mapStateToProps = (state, ownProps) => ({})
const mapDispatchToProps = (dispatch, ownProps) => ({ doSomething: () => dispatch(action)})
const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter)
```

*mapDispatchToProps* gives you an opportunity to create functions (passed into your Component as props) that will invoke Redux's dispatch function. In the above example `props.doSomething` is a function that when called will *dispatch* `action`

- Update `<Counter>` to call a function that is passed via props when *clicked*
- Implement `mapDispatchToProps`, returning a function that will dispatch a suitable action (e.g. `{ type: 'INCREMENT' }`)
- Implement your reducer to update `count` in your application state when that action is received

When you've done this, you should be amazed that:
- Re-rendering your application happens automagically!
- In the dev-tools you can see the actions being dispatched, and step through the corresponding state changes!

### Super important notes about reducers

Observe the following **rules** and guidelines
- Your reducer must set up some initial state (as it will be called without an action when the store is initialised)
- Your reducer should return application state unchanged *if it receives actions it doesn't know about*
- Your **should** only put [plain data types in your Redux store](https://github.com/markerikson/redux/blob/create-faq-page/docs/FAQ.md#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state) (strings, numbers, booleans, plain objects, etc)
- Your reducer [**must never mutate state**](http://redux.js.org/docs/Troubleshooting.html#never-mutate-reducer-arguments) - instead you need to return a copied/modified state object
- As your application grows in complexity, copying/modifying the state in a single reducer will become unwieldy
  - [combineReducers](http://redux.js.org/docs/recipes/reducers/UsingCombineReducers.html) is a good approach for handling this complexity

See [the docs](http://redux.js.org/docs/basics/Reducers.html) for more

## Final Task

Re-implement the [task from the React section](../react#task) using Redux to manage the state. You should see that
- all your components should become *dumb*
  - they simply render the props they're given
  - they no longer have to manage their own state (or their childrens' state, where you've had to *lift state up*)
- if you install Chrome's [Redux dev tools](https://github.com/gaearon/redux-devtools) you can **see and debug** your application state

## More info

The official [Redux docs](http://redux.js.org/) are great (though I found the 'getting started' element less easy to follow than the equivalent in the React docs...)
