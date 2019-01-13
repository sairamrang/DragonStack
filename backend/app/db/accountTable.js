const pool = require('../../databasePool');


class AccountTable {
    static storeAccount ({ userHash, passHash, sessionId }){
        return new Promise((resolve, reject) => {
            // console.log ('sessionId', sessionId);
            pool.query (
                'INSERT INTO account(username, password, sessionid) VALUES($1, $2, $3) RETURNING id', 
                [userHash, passHash, sessionId],
                (error, response) =>{
                    if (error) return reject (error);
                    const acccountId = response.rows[0].id ;
                    resolve({ acccountId }) ;
    
                }
            );
        }
        );
    }
    static updateSession ({ sessionId, userHash }){
        return new Promise((resolve, reject) => {
            pool.query (
                'Update account set sessionid = $1 where username = $2', 
                [sessionId, userHash],
                (error, response) =>{
                    if (error) return reject (error);
                    resolve() ;
                }
            );
        }
        );
    }
    static getAccount({ userHash }) {
        return new Promise((resolve, reject) => {
            console.log ('get account');

          pool.query(
            `SELECT id, password, sessionid
            FROM account
            WHERE username = $1`, [userHash],
            (error, response) => {
              if (error) return reject(error);
              resolve({ account : response.rows[0] });
            }
          )
        });
    }

    static getPassword({ usernameHash }) {
        return new Promise((resolve, reject) => {
          pool.query(
            `SELECT password 
            FROM account
            WHERE username = $1`, [usernameHash],
            (error, response) => {
              if (error) return reject(error);
              resolve(response.rows);
            }
          )
        });
    }
}

module.exports = AccountTable;

