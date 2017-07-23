const React = require('react')
const ReactDOM = require('react-dom')

const Redux = require('redux')
const ReactReduxBindings = require('react-redux')
const Provider = ReactReduxBindings.Provider

// Our React app
const App = () => (
  <div>Hello world Redux app</div>
)

// Redux store reducer logic
function reducer (state = {holla: 'world'}, action) {
  return state
}

// Redux store creation (with optional dev tools binding)
const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// Start our React app, wrapped in a <Provider />
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
