const TRAITS = require ("../data/traits.json");


const DEFAULT_PROPERTIES = {
    name : "unnamed",
    genID : 0,
    dragonId :-1,
    get birthdate (){ return new Date()},
    get randomTrait () {
        const traits = [];
        TRAITS.forEach(TRAIT => {
            let traitType = TRAIT.type;
            let traitvalue = TRAIT.values [
                Math.floor (Math.random() * TRAIT.values.length)
            ];
            traits.push ({traitType, traitvalue});
        });
        return traits;
    }
}

class Dragon{
    constructor ({birthdate, name, traits, generationID, dragonId} = {}){
        this.birthdate = birthdate || DEFAULT_PROPERTIES.birthdate;
        this.name = name || DEFAULT_PROPERTIES.name;
        this.traits = traits || DEFAULT_PROPERTIES.randomTrait;
        this.generationID = generationID || DEFAULT_PROPERTIES.genID;
        this.dragonId = dragonId || DEFAULT_PROPERTIES.dragonId;
        // this.print ();
    }

    print(){
        console.log ("name is " + this.name + " birthdate is " + this.birthdate + " traits " + this.traits +
         " generation id " + this.generationID + " dragon id " + this.dragonId);
    }
}

module.exports = Dragon;