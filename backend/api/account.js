const { Router } = require('express');
const router =  new Router();
const AccountTable = require('../app/db/accountTable');
const { hash } = require('../app/account/helper');
const Session = require('../app/account/Session');
const { authenticatedAccount } = require('./helper');

router.post('/signup',
    (req, res, next) => {
        let { username, password } = req.body;
        if (username.trim().length > 0){
            const userHash = hash(username);
            const passHash = hash(password);
            AccountTable.getAccount({ userHash }).then(
                ({ account }) => {
                    if (!account){
                        const session =  new Session({ username });
                        const sessionString = session.toString();
                        const sessionId = session.id;   
                        AccountTable.storeAccount({ userHash, passHash, sessionId }).then(
                            ({ acccountId }) => {
                                res.cookie ('sessionString', sessionString,{
                                    expire : Date.now() + 3600000,
                                    httpOnly : true
                                    // , secure : true
                                }
                                );
                                const msg = { message : `success account id : ${acccountId}`};
                                console.log ('msg ', msg);
                                res.json (msg);
                            }
                        )
                    }else{
                        const error = new Error ('Username already exists');
                        error.statusCode = 409;
                        res.clearCookie ('sessionString');
                        next (error);
                    }
                }
            )
            .catch(error => next (error));
        }else{
            const error = new Error ('Username is empty');
            error.statusCode = 408;
            res.clearCookie ('sessionString');
            next (error);
        }
    }
);

router.post ('/login',
    (req,res, next) => {
        let { username, password } = req.body;
        if (username.trim().length > 0){
            const userHash = hash(username);
            const passHash = hash(password);
            AccountTable.getAccount({ userHash }).then(
                ({ account }) => {
                    if (account){
                        if (account.password === passHash){
                            const session =  new Session({ username });
                            const sessionString = session.toString();
                            const sessionId = session.id;   

                            AccountTable.updateSession ({ sessionId, userHash } ).then (
                                ()=>{
                                    res.cookie ('sessionString', sessionString,{
                                        expire : Date.now() + 3600000,
                                        httpOnly : true
                                        // , secure : true
                                    }
                                    );
                                    res.json ({ message : `Log in successful`});
                                }
                            )
                        }
                        else{
                            const error = new Error ('Log in unsuccessful');
                            error.statusCode = 409;
                            res.clearCookie ('sessionString');
                            next (error);
                        }
                    }else{
                        const error = new Error ('Cannot find user');
                        error.statusCode = 409;
                        res.clearCookie ('sessionString');
                        next (error);
                    }
                }
            )
            .catch(error => next (error));
        }else{
            const error = new Error ('Username is empty');
            error.statusCode = 408;
            res.clearCookie ('sessionString');
            next (error);
        }
        
    }
);

router.get('/logout',(req,res, next) => {
    const sessionString  = req.cookies.sessionString;
    if (!sessionString){
        res.json ({ message : `Unable to find cookie`});
    }else {
        const { username } = Session.parse (sessionString);
        AccountTable.updateSession ({ sessionId: null, userHash : hash(username) })
        .then()
        .catch (error => next (error));

        res.clearCookie ('sessionString');
        res.json ({ message : `Logged out`});
    }
});

router.get('/authenticated',(req,res, next) => {
    const sessionString  = req.cookies.sessionString;
    authenticatedAccount ({ sessionString }).then(
        ({ authenticated }) => {
            res.json ({ authenticated });
            console.log ('authenticated', { authenticated });
        }
    ).catch(error => next (error));
    
});

module.exports = router;