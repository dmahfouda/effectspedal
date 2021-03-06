const mongoose = require('mongoose')
const express = require('express')
const tcom = require('thesaurus-com')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const app = express()
const port = 3001

mongoose.connect('mongodb://localhost/effectspedal')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connnected')
})

let wordsArraySchema = new mongoose.Schema({
  words: Array
})

let wordsArray = mongoose.model('wordsArray', wordsArraySchema);

app.use(cors())
app.use(bodyParser.json())

app.get('/newdocument', (req, res) => {
    var words = new wordsArray({})
    console.log('logged')

    words.save(function (err, words) {
        if (err) return console.error(err)
        res.send(words._id)
    })
})

app.get('/antonym', (req, res) => {
	console.log(`req: ${req.query.word}`)
	res.send(tcom.search(req.query.word))
})

app.post('/save', (req, res) => {
	// console.log(req)
    console.log('postreq')
    console.log(req.body)
    res.send('post success')
})

app.post('/token', (req, res) => {
    console.log('POST /token')

    const page = new wordsArray()

    page.save().then(() => {
        res.send({token: page._id})
    })
})

app.use(express.static('build'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
