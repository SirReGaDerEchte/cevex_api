const { authentication: { secret } } = require('./config.json');

function sendMessage(message) {
    fetch("https://frettir.sirrega.de/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": secret,
        },
        body: JSON.stringify({ name: "cevex_api", message: message })
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));
}

module.exports = { sendMessage }