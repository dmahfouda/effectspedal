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
  }

  handleKeyPress = (e) => {
    let s = this.state.currentKeyBuffer
    console.log(`s: ${s}`)
    this.setState({currentKeyBuffer: s+String.fromCharCode(e.keyCode)});
    if (e.keyCode == 32) {
      this.setState({
        currentKeyBuffer: '',
        wordsArray: [
          ...this.state.wordsArray, 
          {
            word: this.state.currentKeyBuffer, 
            decisionSpace: ['thing']
          }
        ]
      })
      console.log(this.state.wordsArray)
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  // alternateWord = () => {
  //   setInterval(()=>{

  //   }, 1000)
  // }

  renderWords = () => {
    return this.state.wordsArray.map(({word,decisionSpace})=>{
      return(
        <div className='word-container'>
          <div className='active'>{word}</div>
          {decisionSpace.map((word,index)=>(<div className='passive' key={index}>{word}</div>))}
        </div>
      )
    })
  }

  render() {
    return (
      <div className="App">
        <div className='container'>{this.renderWords()}</div>
        <span>{this.state.currentKeyBuffer}</span>
      </div>
    );
  }
}

export default App;
// {this.state.wordsArray.join(' ')}