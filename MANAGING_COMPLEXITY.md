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

The Redux docs can explain [Normalizing state shape](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html) better than I can, but I whole-heartedly recommend the practice, having found the following benefits

### IDs

With normalised data, referenced by IDs, the props you pass round your Component hierarchy typically reduce down to just that ID. In a given *connected component* you can retrieve a fully hydrated object from your store with this ID to gain access to specific attributes of that object your component.

This is **much easier to reason about and implement consistently** in comparison to passing the item (or a subset of its attributes) through your Component's props. Additionally, you potentially benefit from reduced React re-renders, as the passed Component props are less prone to change (the ID potentially changes less frequently than the nested attribute of an item)

### Relationships in store state

Treating your normalised "entities" like a relational database makes relationships between discrete parts of your state tree explicit and therefore easier to infer. In a de-normalised store, relationships/coupling between discrete parts of state may be hidden

### Persistence

Finally, I've had success using the following general state shape:
```javascript
{
  uiThingA: {},
  uiThingB: {},
  entities: {
    persistentThingA: {
      byId: {},
      allIds: []
    },
    persistentThingB: {
      byId: {},
      allIds: []
    }
  }
}
```

I treat all my normalised state as persistent, i.e. I expect to be able to serialise/de-serialise this state (say to a file, a database, or perhaps to [local storage](https://github.com/elgerlambert/redux-localstorage)) if I want to store/restore application state between sessions.

All my *other state* (typically transient UI state such as loading spinners, user input, etc) is kept de-normalised, and I expect it to reset between sessions, to be re-populated as necessary as the user interacts with the application


## Abstract querying store state

If you connect your Components you will probably find yourself writing things like:
```javascript
const mapDispatchToProps = (state) => ({ b: state.thing.a.b })
```

If you use Redux thunks you'll like write action creators like:
```javascript
function myActionCreator (delta) {
  return (dispatch, getState) {
    return {
      type: 'AN_ACTION'
      b: getState().thing.a.b + delta
    }
  }
}
```

Both of the above snippets access some nested property `thing.a.b` from your redux store. What happens if lots of places in your app need to access `b`? What if you find you want to change the shape of your store state, so `b` now resides somewhere else, e.g. `thing.a.meta.b`? The following minor refactor addresses these issues:
```javascript
const bSelector (state) => state.thing.a.b

const mapDispatchToProps = (state) => ({ b: bSelector(state) })

function myActionCreator (delta) {
  return (dispatch, getState) {
    return {
      type: 'AN_ACTION'
      b: bSelector(getState()) + delta
    }
  }
}
```

I found using some layer of abstraction when querying you're store state offers two big benefits:
- reduce duplication where state is used in multiple places
- decouple components/action creators from specifics of store state shape
  - **this is especially useful if you need to refactor your state!**

This is especially helpful in a large application. The following commits show a few of the refactoring steps I undertook in a project where I moved to using [redux-reselect](https://github.com/reactjs/reselect) to replace direct querying of my state. In retro-spect, I'd definitely advocate adding that abstraction from the start in spite of the additional complexity it would have added initially...
- https://github.com/crosslandwa/push-wrapper-with-react/commit/76aaf530417a44950c6f171ccd12794241d0a64a
- https://github.com/crosslandwa/push-wrapper-with-react/commit/6fae7c048b75a6e93810134be1696dc86f2d82c9

Finally, re-select potentially gives you a performance boost through memoizing the selectors you write, which can be good (assuming you're not running in a memory constrained environment...)
