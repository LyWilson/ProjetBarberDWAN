const TOKEN_SECRET_KEY = 'PROJET2_SECRET_KEY'
const jwt = require('jsonwebtoken');
const { blackListToken } = require('./BlacklistToken');


function authentificationDuToken(req,res,next){

    const token = sessionStorage.getItem('token')
    console.log(token)

    if(!token){
        return res.status(401).json({message: 'Accès interdit'})
    }
    if(blackListToken.includes(token)){
        return res.status(401).json({message: "Token ivalide"})
    }

    jwt.verify(token, TOKEN_SECRET_KEY,(err, user) => {

        if(err){
            return res.status(403).json({message: 'Token invalide'})
        }
        req.user = user;
        console.log(user)
        next();
    })
}

module.exports = authentificationDuToken;
