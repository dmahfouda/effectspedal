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

//bad performance here maybe switch directly by indexing
  alternateWords = () => {
    // console.log(document.querySelectorAll('.word-container'))
      let wordContainers = document.querySelectorAll('.word-container')
      if (wordContainers.length > 0){
        let altWords = wordContainers[Math.floor(Math.random()*wordContainers.length)].childNodes
        let changeWordIndex = Math.floor(Math.random()*altWords.length)
        altWords.forEach(word=>{
          word.className = 'passive'
        })
        altWords[changeWordIndex].className = 'active'
    }
    // wordContainers.forEach(wordContainer=>{
      // let altWords = wordContainer.childNodes
      // let changeWordIndex = Math.floor(Math.random()*altWords.length)
      //   altWords.forEach(word=>{
      //     word.className = 'passive'
      //   })
      // altWords[changeWordIndex].className = 'active'
  }

  // setInterval(alternateWords,5000)


  handleKeyPress = (e) => {

    let s = this.state.currentKeyBuffer
    this.setState({currentKeyBuffer: s+String.fromCharCode(e.keyCode)});

    if (e.keyCode == 32) {
      console.log(`this.state.currentKeyBuffer ${this.state.currentKeyBuffer}`)

      axios.get(`http://localhost:3001/antonym`,{params:{word:this.state.currentKeyBuffer}})
        .then(res => {
            console.log('successful get')
            const words = res.data;
            console.log(words)
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
        .catch(function (error) {
            console.log('post error')
            console.log(error);
        })

        console.log('posting')
        axios.post('http://localhost:3001/save', {
            firstName: 'Fred',
            lastName: 'Flintstone'
          }
        )
        // axios.post('http://localhost:3001/save',{
        //     something: 'something'
        // })
        .then(function (response) {
            console.log('successful post response')
            console.log(response);
        })
        .catch(function (error) {
            console.log('post error')
            console.log(error);
        })
      }
  }

  handleKeyDown = (e) => {
    let s = this.state.currentKeyBuffer
    if (e.keyCode == 46 || e.keyCode == 8) {
      this.setState({currentKeyBuffer: s.slice(0,s.length-1)})
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keypress', this.handleKeyPress)
    setInterval(this.alternateWords,1000)

  }

  renderWords = () => {
    return this.state.wordsArray.map((wordObject) => {
      return(
        <div className='word-container'>
          <span className='active'>{wordObject.word}</span>
          {wordObject.decisionSpace.map(word => { return <span className='passive'>{word}</span>})}
        </div>
      )
    })
  }

  render() {
    return (
      <div className="App">
        <div className='container'>
            <div className='input'>{this.state.currentKeyBuffer}</div>
            {this.renderWords()}
        </div>
      </div>
    );
  }
}

export default App;
