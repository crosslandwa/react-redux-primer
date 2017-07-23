const React = require('react')
const ReactDOM = require('react-dom')

const Redux = require('redux')
const ReactReduxBindings = require('react-redux')
const Provider = ReactReduxBindings.Provider
const connect = ReactReduxBindings.connect
const thunkMiddleware = require('redux-thunk').default

// Our React app
const mapStateToAppProps = (state) => ({titles: state.titles})
const App = connect(mapStateToAppProps)((props) => (
  <div style={{display: 'flex', flexDirection: 'column', maxWidth: 800, height: 200, justifyContent: 'space-around', margin: 'auto' }}>
    <div style={{display: 'flex', justifyContent: 'space-around'}}>
      {props.titles.length > 0
        ? (props.titles).map((title, index) => <Tile key={index} title={title} />)
        : <Loader />
      }
    </div>
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <WatchingBar />
    </div>
  </div>
))

// Network code
function loadJSON (url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.onload = () => request.status === 200 ? resolve(JSON.parse(request.responseText)) : reject(new Error(`${request.status} loading: "${url}"`))
    request.send()
  })
}

// Loader
const mapStateToLoaderProps = (state) => ({})
const mapDispatchToLoaderProps = (dispatch) => ({ onClick: () => dispatch(loadTitles())})
const loadTitles = () => (dispatch, getState) => {
  const url = './data.json'
  dispatch({ type: 'LOADING', url: url})
  loadJSON(url)
    .then(data => {
      dispatch({
        type: 'LOADED_TITLES',
        titles: data.items.map(item => item.title)
      })
    })
    .catch(console.error) // probably want to handle error in the UI by dispatch an action...
}
const Loader = connect(mapStateToLoaderProps, mapDispatchToLoaderProps)(props => <div onClick={props.onClick} >Click to load titles...</div>)

// Tile
const mapStateToTileProps = (state, ownProps) => ({ selected: state.watching === ownProps.title })
const mapDispatchToTileProps = (dispatch, ownProps) => ({
  onClick: (title) => dispatch({type: 'UPDATE_WATCHING', title: ownProps.title})
})
const Tile = connect(mapStateToTileProps, mapDispatchToTileProps)(props => (
  <div
    style={{textAlign: 'center', backgroundColor: props.selected ? 'crimson' : 'dodgerblue', width: '10%', lineHeight: '24px'}}
    onClick={props.onClick}
  >
    {props.title}
  </div>
))

// Watching bar
const mapStateToWatchingBarProps = (state) => ({ watching: state.watching })
const WatchingBar = connect(mapStateToWatchingBarProps)(props => (
  <div style={{textAlign: 'center', backgroundColor: props.watching ? 'crimson' : 'dodgerblue', width: '100%'}}>
    You are watching: {props.watching || 'nothing'}
  </div>
))

// Redux store reducer logic
const initialState = { titles: [], watching: null }
function reducer (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_WATCHING':
      return Object.assign({}, state, { watching: action.title })
    case 'LOADED_TITLES':
      return Object.assign({}, state, { titles: action.titles })
  }
  return state
}

// Logging middleware
const loggingMiddleware = (store) => (next) => (action) => {
  // your middleware code here
  if (action.type === 'LOADING') console.log(`[LOGGING MIDDLEWARE] Loading: ${action.url}`)
  return next(action)
}

// Redux store creation (with optional dev tools binding)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose
const store = Redux.createStore(
  reducer,
  composeEnhancers(
    Redux.applyMiddleware(thunkMiddleware),
    Redux.applyMiddleware(loggingMiddleware)
  )
)

// Start our React app, wrapped in a <Provider />
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
