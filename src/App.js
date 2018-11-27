import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentKeyBuffer: '',
      wordsArray: []
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    let s = this.state.currentKeyBuffer
    console.log(`s: ${s}`)
    this.setState({currentKeyBuffer: s+String.fromCharCode(e.keyCode)});
    if (e.keyCode == 32) {
      this.state.wordsArray.push(this.state.currentKeyBuffer)
      this.state.currentKeyBuffer = ''
      console.log(this.state.wordsArray)
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
        {this.state.wordsArray.join(' ')}
        {this.state.currentKeyBuffer}
      </div>
    );
  }
}

export default App;
