# Redux and async actions

Redux is a framework that applies the uni-directional data flow concept to your entire application. It also plays very nicely with React giving (at least) the following benefits
- application state is stored centrally and consistently handled
  - this helps reduce coupling between related components
  - in most cases state handling can be removed completely from your React components
- the architecture scales well - almost every new feature you add can be **implemented in the same way**
  - the complexity of your application effectively scales linearly with the number of features added


## Action creators

Introduce into diagram in async section (add side note of reducing duplication if multiple components raise same action)

Redux-thunk (disclaimer, there are other ways to do this)


## More info

The [Advanced section of the Redux docs](http://redux.js.org/docs/advanced/) is the place to go for (much) more detail
