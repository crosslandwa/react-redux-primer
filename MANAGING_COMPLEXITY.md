# Managing Complexity

I've found adhering to the React/Redux application architecture, and following it's notion of uni-directional data flow, scales really well, allowing you to build feature rich applications.

I've found the following strategies useful for managing complexity as I add features

## Package by module (not by function)
Assuming a project with a single entry (`index.js`), a top level React Component (`App.js`) and several `Component`s, it's tempting to layout your repo like this...
```
index.js
/src
  actions.js
  App.js
  ComponentA.js
  ComponentB.js
  ComponentC.js
  ComponentD.js
  middleware.js
  reducers.js
```
...where all the actions (for all the Components) live in `actions.js`, all the Middlewares in `middleware.js` and all your reducers (for all Components) in `reducers.js`

Does ComponentC emit any actions? Is there a slice of the state tree associated with ComponentB? Which components rely on middleware? You could try and make answers to those questions easier to infer through an alternative directory structure, perhaps something like
```
index.js
/src
  /actions
    componentCActions.js
    componentDActions.js
  /middleware
    componentCMiddleware.js
  /reducers
    componentCReducers.js
    componentDReducers.js
  App.js
  ComponentA.js
  ComponentB.js
  ComponentC.js
  ComponentD.js
```

This is better, but in a large project you may still have to go hunting around the see what mix of actions/middleware/reducers a given component might collaborate with. It also doesn't help identify what level within your application hierarchy those components may sit - which are siblings, what are the parent/child relationships?

My preference is for something like
```
index.js
/src
  /moduleA
    ComponentA.js
    ComponentB.js
  /moduleC
    actions.js
    ComponentC.js
    middleware.js
    reducers.js
  /moduleD
    actions.js
    ComponentD.js
    reducers.js
  App.js
```

This packaging by module helps you see what Components may collaborate to deliver a larger unit of work (perhaps a feature, perhaps some behaviour or utility within your application), and at a glance the mix of actions, middleware and reducers that may be needed to implement that work. It also helps imply
- the bounded context that those Components sit within
  - it might be strange for `/moduleD/reducers.js` to respond to an action from `/moduleC/actions.js`
- how those modules interact
  - what does it mean if ComponentD.js dispatches an action from `../moduleC/actions.js`?


## Action creators almost always

I've found it beneficial to use action creators by default, and *only dispatch actions inline when I'm being lazy...*

My main motivations for this is decoupling knowledge of how an action is created from the Component, specifically whether the action (in a Redux Thunk world) is dispatched synchronously or asynchronously. Being able to change the implementation of the action creation without touching the Component dispatching it (unless the action creator's signature changes) is a win.

Further, encapsulating into action creators makes it easy for multiple (UI) components to dispatch the same actions

This [blog post](http://blog.isquaredsoftware.com/2016/10/idiomatic-redux-why-use-action-creators/) discusses the issue in more detail


## Normalised state

Link the real docs
Persistent state is Normalised
Transient state (UI state for the session) de-normalised

## Abstract querying store state

Demonstrate by example

Remove duplication and ease re-factoring where several components/modules in app influenced by same state
 - Link diffs in drum machine that show consolidation of duplicated state parsing

Link to Re-select as library that adds this with performance gains through memoization (assuming not memory constrained)

Using thunks makes use of re-select easier as you have access to getState in your action creators
