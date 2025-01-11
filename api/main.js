const express = require('express')
const app = express();
const port = 9001;

const cevex = require('./cevex')
const frettir = require('./frettir')

app.use(express.urlencoded({ extended: true }));

app.post('/data', (req, res) => {
    frettir.sendMessage("New request made.")
    
    const username = req.body.username;
    const password = req.body.password;
    const school = req.body.school;
    
    if (!username || !password || !school) {
        frettir.sendMessage("Error while retrieving userdata.")
        res.status(400).json({ error: 'Username, password and school required.' })
        return;
    }
    
    cevex.retrieveData(username, password, school)
    .then((result) => {
        frettir.sendMessage("Successfully retrieved userdata.")
        res.status(200)
        res.send(result)
    })
})

app.listen(port, function() {
    frettir.sendMessage("cevex_api is now online.")
    console.log('Listening on port', port)
})