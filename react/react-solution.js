const React = require('react')
const ReactDOM = require('react-dom')

const titles = ['A', 'B', 'C', 'D']

class App extends React.Component {
  constructor(props) {
    super(props)
    this.updateWatching = this.updateWatching.bind(this)
    this.state = {}
  }

  updateWatching(title) {
    this.setState({watching: title})
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 800,
        height: 200,
        justifyContent: 'space-around',
        margin: 'auto'
      }}>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          {titles.map((title, index) => (
            <Tile
              key={index}
              selected={this.state.watching}
              title={title}
              onClick={this.updateWatching}
            />
          ))}
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <WatchingBar title={this.state.watching} />
        </div>
      </div>
    )
  }
}

const Tile = props => (
  <div
    style={{
      textAlign: 'center',
      backgroundColor: props.selected === props.title ? 'crimson' : 'dodgerblue',
      width: '10%',
      lineHeight: '24px'
    }}
    onClick={() => props.onClick(props.title)}
  >
    {props.title}
  </div>
)

const WatchingBar = props => (
  <div style={{textAlign: 'center', backgroundColor: 'crimson', width: '100%'}}>
    You are watching: {props.title || 'nothing'}
  </div>
)

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
