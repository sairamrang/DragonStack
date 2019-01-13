const pool = require('../../databasePool');
const Dragon = require('../dragon');


class DragonTable {
    static storeDragon (dragon){
        return new Promise((resolve, reject) => {
            //console.log ("dragon", dragon);
            pool.query (
                'INSERT INTO dragon(birthdate, nickname,"generationId") VALUES($1, $2, $3) RETURNING id', 
                [dragon.birthdate, dragon.name, dragon.generationID],
                (error, response) =>{
                    if (error) return reject (error);
                    const dragonId = response.rows[0].id ;
                    resolve({ dragonId }) ;
    
                }
            );
        }
        );
        
    }
    
    static getDragon({ dragonId }) {
        return new Promise((resolve, reject) => {
          pool.query(
            `SELECT id as dragonId, birthdate, nickname, "generationId"
            FROM dragon
            WHERE dragon.id in (select max(id) from dragon)`,
            (error, response) => {
              if (error) return reject(error);
    
              if (response.rows.length === 0) return reject(new Error('no dragon'));
              resolve(response.rows[0]);
            }
          )
        });
    }

    static getDragonTraits({ dragonId }) {
      return new Promise((resolve, reject) => {
        pool.query(
          `SELECT "traitType", "traitValue"
           FROM trait
           INNER JOIN dragontrait ON trait.id = dragonTrait.traitid
           WHERE dragontrait.dragonid = $1`,
          [dragonId],
          (error, response) => {
            if (error) return reject(error);
            resolve(response.rows);
          }
        )
      });
  }

    static getDragonWithTraits ({ dragonId }) {

        return Promise.all([
          DragonTable.getDragon({ dragonId }),
          DragonTable.getDragonTraits ({ dragonId })
        ])
        .then(([dragon, dragonTraits]) => {
          const newDragon = new Dragon({ ...dragon, dragonId, traits: dragonTraits });
          newDragon.name = dragon.nickname;
          newDragon.generationID = dragon.generationId;
          console.log ('newDragon ', dragon);
          return newDragon;
        })
        .catch(error => console.error(error));
      };
}

module.exports = DragonTable;

