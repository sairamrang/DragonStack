const { Router } = require('express');
const router =  new Router();
const DragonTable = require('../app/db/dragonTable');
const traitsTable = require('../app/db/traitsTable')
const dragonTraitTable = require('../app/db/DragonTraitTable')
//const Dragon =  require ('../app/dragon');

router.get('/existing',
    (req, res, next)=> {
        const dragonId = req.app.locals.generationEngine.generation.dragon.dragonId;
        //console.log (`Dragon id inside API  ${dragonId}`);

        if (dragonId){
            DragonTable.getDragonWithTraits ({ 'dragonId' : dragonId })
            .then (newDragon => {
                res.json({ dragon : newDragon });
            })
            .catch(error => next(error));
        }else{
            res.json({ dragon : 'no dragon id' });

        }
    }
);

router.get('/new',
    (req, res, next)=> {
        const genID = req.app.locals.generationEngine.generation.generationID;
        const newDragon = req.app.locals.generationEngine.generation.newDragon(genID);
        DragonTable.storeDragon (newDragon).then(
            ({ dragonId }) => {
                newDragon.dragonId = dragonId;
                updateDragonTraits(newDragon.traits, dragonId);
                res.json({ dragon : newDragon });
            }
        )
        .catch(error => next(error));
    }
);

const updateDragonTraits = (traits, dragonId) => {
    traits.forEach(trait => {
        let traitType = trait.traitType;
        let traitvalue = trait.traitvalue;
        traitsTable.getTraits ({'traitType': traitType, 'traitValue' : traitvalue }).then(
            ({ traitId }) => {                
                dragonTraitTable.storeDragonTrait ({ 'dragonId' : dragonId, 'traitId' : traitId }).then(
                    ({ dragonTraitId }) =>{
                        //console.log (`dragonTraitId is ${dragonTraitId}.`);
                    }
                )
                .catch (error => next(error));
            }
        )
        .catch(error => next(error));
    });
}

module.exports = router;

