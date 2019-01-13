const pool = require('../../databasePool');

class TraitsTable {
    static getTraits ({ traitType, traitValue }){
        return new Promise((resolve, reject) => {
            pool.query (
                'SELECT * FROM trait where "traitType" = $1 and "traitValue" = $2 ', [traitType, traitValue],
                (error, response) =>{
                    if (error) console.log ("error", error);
                    const traitId = response.rows[0].id ;
                    resolve({ traitId }) ;
                }
            );
        }
        );
    }
}

module.exports = TraitsTable;

