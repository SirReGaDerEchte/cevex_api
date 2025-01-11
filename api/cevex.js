const baseUrl = ""
const loginUrl = "";

async function retrieveData(username, password) {

    const phpsessid = await getSessionId();

    return new Promise((resolve) => {
        validateSessionId(username, password, phpsessid)
        .then(result => {
            console.log(result)
            resolve(result);
        })
    })
}

async function getSessionId() {
    const response = await fetch(baseUrl, {
        method: 'GET',
    })

    const phpsessid = await response.headers.get('set-cookie').split(';')[0];
    return phpsessid;
}

async function validateSessionId(username, password, phpsessid) {
    const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Cookie': phpsessid,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}&password=${password}&login=Anmelden`
    })

    return response.text();
}

module.exports = { retrieveData }