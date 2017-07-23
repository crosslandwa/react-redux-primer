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
## Async actions

Where in your application should async actions (e.g. network requests) sit? The simple (and probably best) answer is **always in your action creators**.

Put another way, keep your components dumb (no state), and your reducers functional (state + action go in, new state comes out, **always**) - this leaves **only** your action creation code as a place to write code with side-effects...

## Action creators

Introduce into diagram in async section (add side note of reducing duplication if multiple components raise same action)

Redux-thunk (disclaimer, there are other ways to do this)


## More info

The [Advanced section of the Redux docs](http://redux.js.org/docs/advanced/) is the place to go for (much) more detail
