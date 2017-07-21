const React = require('react')
const styles = {
  height: 80,
  fontSize: 18,
  width: 80,
  backgroundColor: '#c7ccce',
  borderRadius: 10,
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: '#333333',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
class Clickable extends React.Component {
  constructor(props) {
    super(props)
    this.doThis = this.doThis.bind(this)
  }

  doThis() {
    alert('clicked')
  }

  render() {
    const action = this.props.action || this.doThis
    return <div style={styles} onClick={action} >Click me</div>
  }
}

module.exports = Clickable
