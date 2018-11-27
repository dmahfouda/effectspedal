import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {currentKey: ''}
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    let s = this.state.currentKey
    console.log(`s: ${s}`)
    this.setState({currentKey: s+String.fromCharCode(e.keyCode)});
    if(e.keycode == 32){
      console.log('you hit space')
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  render() {
    return (
      <div className="App">
        {this.state.currentKey}
      </div>
    );
  }
}

export default App;
