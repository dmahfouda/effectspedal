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
        let altWords = wordContainers[Math.floor(Math.random() * wordContainers.length)].childNodes
        let changeWordIndex = Math.floor(Math.random() * altWords.length)
        altWords.forEach(word => {
          word.className = 'passive'
        })
        altWords[changeWordIndex].className = 'active'
    }
  }

  handleKeyPress = (e) => {

    let s = this.state.currentKeyBuffer
    this.setState({currentKeyBuffer: s+String.fromCharCode(e.keyCode)})

    if (e.keyCode == 32) {
        let lookup = this.state.currentKeyBuffer
        this.setState({currentKeyBuffer: ''})

      axios.get(`http://localhost:3001/antonym`,{params:{word:lookup}})
        .then(res => {
            const words = res.data;
            this.setState({
              wordsArray: [
                ...this.state.wordsArray,
                {
                  word: lookup,
                  decisionSpace: res.data.antonyms
                }
              ]
            })

            axios.post('http://localhost:3001/save', this.state.wordsArray)
            .then(function (response) {console.log(response)})
            .catch(function (error) {console.log(error)})
        })
        .catch(function (error) {console.log(error)})
      }
  }

  handleKeyDown = (e) => {
    let s = this.state.currentKeyBuffer
    if (e.keyCode == 46 || e.keyCode == 8) {
      this.setState({currentKeyBuffer: s.slice(0,s.length-1)})
    }
  }

  getToken = () => {
      axios.post('http://localhost:3001/token')
      .then(function (response) {
          const token = response.data.token;
          if (!token) throw new Error('did not get visit token from server')
          window.history.pushState({}, null, `/${token}`)
      })
      .catch(function (error) {
          console.log('post error')
          console.log(error)
      })
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
    setInterval(this.alternateWords,1000)
    this.getToken()
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
