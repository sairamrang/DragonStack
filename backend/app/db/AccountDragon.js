const pool = require('../../databasePool');

class AccountDragonTable {
    static storeAccountDragon ({ accountid, dragonid }){
        return new Promise((resolve, reject) => {
            pool.query (
                'INSERT INTO accountdragon(accountid, dragonid) VALUES($1, $2) RETURNING id', 
                [accountid, dragonid],
                (error, response) =>{
                    if (error) return reject (error);
                    const accountDragonId = response.rows[0].id ;
                    resolve({ accountDragonId }) ;
                }
            );
        }
        );
    }
}

module.exports = AccountDragonTable;