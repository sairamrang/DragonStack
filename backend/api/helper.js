const AccountTable = require('../app/db/accountTable');
const Session = require('../app/account/Session');
const { hash } = require('../app/account/helper');


const authenticatedAccount = ({ sessionString }) =>{
    return new Promise ((resolve, reject) => {
        if (!sessionString || !Session.verify(sessionString) ){
            const error = new Error ('Invalid Session');
            error.statusCode = 409;
            reject (error);
        } else {
            const { username, id } = Session.parse (sessionString);
            AccountTable.getAccount ({userHash : hash(username)})
            .then(
                ({ account }) => {
                    const authenticated = account.sessionid === id;
                    resolve ({ account, authenticated });
                }
            )
            .catch (error => reject (error));
        }
        
    });
}

module.exports = { authenticatedAccount };