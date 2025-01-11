const express = require('express')
const app = express();
const port = 9001;

const cevex = require('./cevex')

app.use(express.urlencoded({ extended: true }));

app.post('/data', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const school = req.body.school;
    
    if (!username || !password || !school) {
        res.status(400).json({ error: 'Username, password and school required.' })
        return;
    }

    cevex.retrieveData(username, password, school)
    .then((result) => {
        res.status(200)
        res.send(result)
    })
})

app.listen(port, function() {
    console.log('Listening on port', port)
})