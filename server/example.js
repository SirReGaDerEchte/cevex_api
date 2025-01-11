const username = "" // your cevex/homeinfopoint username
const password = "" // your cevex/homeinfopoint password
const school = "" // your school's name

const response = await fetch("https://cevex.sirrega.de/data", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `username=${username}&password=${password}&school=${school}`
})

console.log(await response.text())