import React, { Component } from 'react';
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
            const words = res.data;
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

            axios.post('http://localhost:3001/save', this.state.wordsArray
            )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })

        })
        .catch(function (error) {
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
    axios.get('http://localhost:3001/newdocument', {params:{}})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keypress', this.handleKeyPress)
    setInterval(this.alternateWords,500)
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
