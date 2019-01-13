const SHA256 = require ('crypto-js/sha256');
const { APP_SECRET } = require('../../secrets/index');

const hash = input => {
    const sha =  SHA256(`${APP_SECRET}${input}${APP_SECRET}`).toString();
    //console.log (sha);
    return sha;
}


module.exports = { hash };