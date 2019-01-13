const {REFRESH_RATE, SECONDS} = require ("./config.js");
const refreshRate = REFRESH_RATE * SECONDS;
const Dragon = require("./dragon.js");


class Generation {
    constructor (){
        this.expiration = this.calculateExpiration();
        this.ID = undefined;
    }
    calculateExpiration (){
        const expirationPeriod =  Math.floor (Math.random () * (refreshRate / 2));
        const msUntilExpiration = Math.random () < 0.5 ?
            refreshRate - expirationPeriod : 
            refreshRate + expirationPeriod ;
        return new Date (Date.now() + (msUntilExpiration * 10));
    }

    newDragon (genID){
        if (Date.now() > this.expiration) {
            throw new Error (`This generation expired on ${this.expiration}`);
        }
        this.dragon = new Dragon({name : "GenR", generationID : genID});
        return this.dragon;
    }
}

module.exports = Generation ;