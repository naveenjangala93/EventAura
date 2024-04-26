const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const verifyToken = (request, response, next) =>{
    const bearerToken = request.body.token;  
   // console.log(bearerToken)
    if(bearerToken == undefined){
        response.send({message:"UnAuthorized Access.. Plz Login"})
    }
    else{
        try{
            jwt.verify(bearerToken, 'abcdef')
            next()
        }
        catch(err){
            next(new Error("Session Expired.. Plz Login Again.."))
        }
    }
}
module.exports = verifyToken;
