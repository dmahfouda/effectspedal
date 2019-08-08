const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const api = require('./api')

const app = express()
const port = 3001


app.use(cors())
app.use(bodyParser.json())

api.initialize(app)

app.use(express.static('build'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
