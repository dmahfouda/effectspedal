import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      currentKeyBuffer: '',
      wordsArray: []
    }
  }

  handleKeyPress = (e) => {
    let s = this.state.currentKeyBuffer
    this.setState({currentKeyBuffer: s+String.fromCharCode(e.keyCode)});
    if (e.keyCode == 32) {
      console.log(`this.state.currentKeyBuffer ${this.state.currentKeyBuffer}`)
      axios.get(`http://localhost:3001/antonym`,{params:{word:this.state.currentKeyBuffer}})
        .then(res => {
          const words = res.data;
          console.log(words)
          // this.setState({ persons });
        this.setState({
          currentKeyBuffer: '',
          wordsArray: [
            ...this.state.wordsArray, 
            {
              word: this.state.currentKeyBuffer, 
              decisionSpace: res.data.antonyms
            }
          ]
        })
      })
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  renderWords = () => {
    this.state.wordsArray.forEach((wordObject) => { 
      return(
        <div className='word-container'>
          /*<div className='active'>{word}</div>
          {decisionSpace.map((word,index)=>(<div className='passive' key={index}>{word}</div>))}*/
          <div className='active'>{wordObject.decisionSpace[Math.floor(Math.random()*wordObject.decisionSpace.length)]}</div>
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