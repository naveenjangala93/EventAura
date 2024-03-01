const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const verifyToken = (request, response, next) =>{
    const bearerToken = request.headers.authorization;  
    console.log(bearerToken)
    if(bearerToken == undefined){
        response.send({message:"UnAuthorized Access.. Plz Login"})
    }
    else{
        const token = bearerToken.split(" ")[1]
        try{
            jwt.verify(token, 'abcdef')
            next()
        }
        catch(err){
            next(new Error("Session Expired.. Plz Login Again.."))
        }
    }
}

module.exports = verifyToken;