CREATE TABLE accountdragon (
        id SERIAL PRIMARY KEY,
        accountid INTEGER REFERENCES account(id) ,
        dragonid INTEGER REFERENCES dragon(id) 
    );