const React = require('react')
const ReactDOM = require('react-dom')

const Redux = require('redux')
const ReactReduxBindings = require('react-redux')
const Provider = ReactReduxBindings.Provider
const connect = ReactReduxBindings.connect

// Our React app
const mapStateToAppProps = (state) => ({titles: state.titles})
const App = connect(mapStateToAppProps)((props) => (
  <div style={{display: 'flex', flexDirection: 'column', width: 800, height: 200, justifyContent: 'space-around', margin: 'auto' }}>
    <div style={{display: 'flex', justifyContent: 'space-around'}}>
      {(props.titles).map((title, index) => <Tile key={index} title={title} />)}
    </div>
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <WatchingBar />
    </div>
  </div>
))

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
const initialState = { titles: ['JP', 'JP - The Lost World', 'JPIII', 'JW'], watching: null }
function reducer (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_WATCHING':
      return Object.assign({}, state, { watching: action.title })
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
