const mongoose = require('mongoose')
const tcom = require('thesaurus-com')

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

const initialize = (app) => {
  app.get('/newdocument', (req, res) => {
    var words = new wordsArray({})
    console.log('logged')

    words.save(function (err, words) {
        if (err) return console.error(err)
        res.send(words._id)
    })
  })

  app.get('/pages/:id', (req,res) => {
    wordsArray.findOne({_id: req.params.id}, (err,resp) => {
      res.send(resp)
      console.log(err)
      console.log('resp',resp)
    })
  })

  app.get('/antonym', (req, res) => {
    console.log(`req: ${req.query.word}`)
    res.send(tcom.search(req.query.word))
  })

  app.post('/save', (req, res) => {
    wordsArray.updateOne({ _id: req.body.id }, { words: req.body.words } , (err, insertRes) => {
      res.send('post success')
      console.log(err)
      console.log(insertRes)
    })
  })

  app.post('/token', (req, res) => {
    console.log('POST /token')

    const page = new wordsArray()

    page.save().then(() => {
        res.send({token: page._id})
    })
  })
}

module.exports = { initialize };

