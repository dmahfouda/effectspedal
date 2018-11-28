const express = require('express')
const tcom = require('thesaurus-com')
const app = express()
const port = 3000

app.get('/antonym', (req, res) => {
	console.log(`req: ${req.word}`)
	res.send(tcom.search(req.word))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))