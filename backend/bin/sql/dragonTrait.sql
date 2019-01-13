CREATE TABLE dragontrait (
        id SERIAL PRIMARY KEY,
        dragonid INTEGER REFERENCES dragon(id) ,
        traitid INTEGER REFERENCES trait(id) 
    );