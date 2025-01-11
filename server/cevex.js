let baseUrl;
let loginUrl;

async function retrieveData(username, password, school) {

    baseUrl = `https://homeinfopoint.de/${school}/default.php`;
    loginUrl = `https://homeinfopoint.de/${school}/login.php`;

    const phpsessid = await getSessionId();

    return new Promise((resolve) => {
        validateSessionId(username, password, phpsessid)
        .then(result => {
            resolve(result);
        })
    })
}

async function getSessionId() {
    const response = await fetch(baseUrl, {
        method: 'GET',
    })

    if(response.status === 200) {
        const phpsessid = await response.headers.get('set-cookie').split(';')[0];
        return phpsessid;
    } else {
        return;
    }

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