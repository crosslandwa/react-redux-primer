# Redux

Redux is a framework that applies the uni-directional data flow concept to your entire application. It also plays very nicely with React giving (at least) the following benefits
- application state is stored centrally and consistently handled
  - this helps reduce coupling between related components
  - in most cases state handling can be removed completely from your React components
- the architecture scales well - almost every new feature you add can be **implemented in the same way**
  - the complexity of your application effectively scales linearly with the number of features added

## Redux Uni-directional flow

The **uni-directional data flow** concept is absolutely core here, so lets look at the basic Redux implementation:

![Redux uni-directional data flow diagram](ReduxUnidirectional.svg?raw=true)

- A **Redux store** is creating with some initial state, and bound to your React application via a **Provider** (which is subscribed to the store)
- React renders your components with the initial steps (passing state as props)
- Your React components **dispatch actions** in response to events (user input)
- The **Redux store** receives these actions, and uses **reducers** to *merge the current application state and the action to create a new application state*
- Changes to the store stare trigger a re-render of your application (via the *subscribed* **Provider**)

### Redux
 - re-introduce unidirectional data flow (onclick dispatches action, calls reducer, triggers a re-render)
 - connect up tiles and watching bar from previous example

### Action creators
 - make two tiles, show they duplicate creation of action, refactor into action creator


## More info

The official [Redux docs](http://redux.js.org/) are great (though I found the 'getting started' element less easy to follow than the equivalent in the React docs...)
