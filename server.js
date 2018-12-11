var mongoose = require('mongoose')

const express = require('express')
const tcom = require('thesaurus-com')
const app = express()
const cors = require('cors')
const port = 3001

mongoose.connect('mongodb://localhost/test')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connnected')
});

var wordsArraySchema = new mongoose.Schema({
  words: Array
});

var wordsArray = mongoose.model('wordsArray', wordsArraySchema);

app.use(cors())

app.get('/antonym', (req, res) => {
	console.log(`req: ${req.query.word}`)
	res.send(tcom.search(req.query.word))
})

app.post('/save', (req, res) => {
	console.log('postreq')
	console.log(req)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
