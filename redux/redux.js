const React = require('react')
const ReactDOM = require('react-dom')

const Redux = require('redux')
const ReactReduxBindings = require('react-redux')

function reducer (state = {holla: 'world'}, action) {
  return state
}

const store = Redux.createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const App = () => (
  <div>Hello world Redux app</div>
)

ReactDOM.render(
  <ReactReduxBindings.Provider store={store}>
    <App />
  </ReactReduxBindings.Provider>,
  document.getElementById('app')
)
