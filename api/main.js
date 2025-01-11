const express = require('express')
const app = express();
const port = 9001;

const cevex = require('./cevex')

app.use(express.urlencoded({ extended: true }));

app.post('/data', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    if (!username || !password) {
        res.status(400).json({ error: 'Username and password required.' })
        return;
    }

    cevex.retrieveData(username, password)
    .then((result) => {
        res.status(200)
        res.send(result)
    })
})

app.listen(port, function() {
    console.log('Listening on port', port)
})