# Redux and async actions

![Redux uni-directional data flow diagram](https://rawgit.com/crosslandwa/react-redux-primer/master/redux-async/ReduxUnidirectionalActionCreator.svg)

To re-cap on the redux uni-directional data flow model:
- A **Redux store** is creating with some initial state, and bound to your React application via a **Provider** (which is subscribed to the store)
- React renders your components with the initial steps (passing state as props)
- In response to events (user input) your React components invoke **action creators** to **dispatch actions**
- The **Redux store** receives these actions, and uses **reducers** to *merge the current application state and the action to create a new application state*
- Changes to the store stare trigger a re-render of your application (via the *subscribed* **Provider**)

**Note**
We've built on the model in the [Redux tutorial section](../redux#redux-uni-directional-flow) and introduced *action creators*. At they're simplest these are simply functions that return an **action** (a plain object) *which helps promote re-use/remove duplication* where multiple components raise the same action. The following are equivalent
```javascript
const mapDispatchToTileProps = (dispatch, ownProps) => ({
  onClick: (title) => dispatch({type: 'UPDATE_WATCHING', title: ownProps.title})
})

const updateWatchingCreator = (title) => ({type: 'UPDATE_WATCHING', title: title})
const mapDispatchToTilePropsUsingActionCreator = (dispatch, ownProps) => ({
  onClick: (title) => dispatch(updateWatchingCreator(ownProps.title))
})
```
## Async behaviour

Where in your application should async actions (e.g. network requests) be implemented? The Redux docs suggest ["in general, Redux suggests that code with side effects should be part of the action creation process. "](http://redux.js.org/docs/faq/Actions.html#how-can-i-represent-side-effects-such-as-ajax-calls-why-do-we-need-things-like-action-creators-thunks-and-middleware-to-do-async-behavior). Adhering to this approach lets you keep your components dumb (no state), and your reducers functional (state + action go in, new state out). We'll look at two ways of implementing this:
- encapsulating the side-effecty code in *actions creators*
- adding side-effecty code in *Redux middleware*

## Actions dispatching actions...

Introduce into diagram in async section (add side note of reducing duplication if multiple components raise same action)

Redux-thunk (disclaimer, there are other ways to do this)

### Async/side-effects
 - extend unidirectional data flow model (onclick invokes action creator, action creator dispatches async action creator which dispatches action when done, calls reducer, triggers re-render)
 - make content of tiles come from network call

### Middleware
 - extend unidirectional data flow model to show where middleware fits in
 - go through using this for telemetry, stats, (cross cutting concerns)

## More info

The [Advanced section of the Redux docs](http://redux.js.org/docs/advanced/) is the place to go for (much) more detail
