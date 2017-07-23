const React = require('react')
const ReactDOM = require('react-dom')

const Redux = require('redux')
const ReactReduxBindings = require('react-redux')
const Provider = ReactReduxBindings.Provider
const connect = ReactReduxBindings.connect

// Our React app
const increment = () => ({ type: 'INCREMENT' })
const mapStateToProps = (state) => ({ count: state.count })
const mapDispatchToProps = (dispatch) => ({ onClick: () => dispatch(increment()) })
const App = connect(mapStateToProps, mapDispatchToProps)((props) => (
  <div onClick={props.onClick}>I've been clicked {props.count} times</div>
))

// Redux store reducer logic
function reducer (state = {count: 0}, action) {
  switch (action.type) {
    case 'INCREMENT':
      return Object.assign({}, state, { count: state.count + 1 })
  }
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
