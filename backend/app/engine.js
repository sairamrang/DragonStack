const Generation = require('./generation.js');
const GenerationTable = require('./db/generationtable');


class GenerationEngine{
    constructor (){
        this.generation = null;
        this.timer = null;
    }
    start (){
        this.buildNewGeneration ();    
    }
    stop(){
        clearTimeout (this.timer);
    }
    buildNewGeneration (){
        const gen = new Generation();
        GenerationTable.storeGeneration (gen)
        .then(
            ({ generationID }) => {
                this.generation = gen;
                this.generation.generationID = generationID;
                const timeout = (this.generation.expiration.getTime() - Date.now());
                clearTimeout (this.timer);
                //console.log (`new generation is ${this.generation} and the interval time is ${timeout} and generation ID is ${this.generation.generationID}`);
                
                this.timer = setTimeout (
                    ()=>this.buildNewGeneration(),
                    timeout
                );
            }
            )
        .catch(error => console.error (error));
        
    }
}

module.exports = GenerationEngine;