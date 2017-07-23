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

## Connect to the store

Start to implement counter with Redux, with initial count in the store. mapStateToProps

## Dispatch some actions

Finish implementing counter. mapDispatchToProps. reducers

Introduce idea of combineReducers

## Task

Re-implement the [task from the React section](../react#task) using Redux to manage the state. You should see that
- all your components should become *dumb*
  - they simply render the props they're given
  - they no longer have to manage their own state (or their childrens' state, where you've had to *lift state up*)
- if you install Chrome's [Redux dev tools](https://github.com/gaearon/redux-devtools) you can **see and debug** your application state

## More info

The official [Redux docs](http://redux.js.org/) are great (though I found the 'getting started' element less easy to follow than the equivalent in the React docs...)
