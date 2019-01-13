const pool = require('../../databasePool');

class DragonTraitTable {
    static storeDragonTrait ({ dragonId, traitId }){
        return new Promise((resolve, reject) => {
            pool.query (
                'INSERT INTO dragontrait(dragonid, traitid) VALUES($1, $2) RETURNING id', 
                [dragonId, traitId],
                (error, response) =>{
                    if (error) return reject (error);
                    // console.log ("dragontraitid : ", response.rows[0].id);
                    const dragonTraitId = response.rows[0].id ;
                    resolve({ dragonTraitId }) ;
    
                }
            );
        }
        );
        
    }
}

module.exports = DragonTraitTable;