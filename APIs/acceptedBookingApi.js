const exp = require('express')
const acceptedApp= exp.Router();
const verifyToken = require('./verifyToken')
const expressAsyncHandler = require('express-async-handler')
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const bodyparser=require('body-parser');
acceptedApp.use(bodyparser.json())
acceptedApp.post('/accepted-bookings', expressAsyncHandler(async(request, response)=>{
    const acceptedCollectionObj=request.app.get('acceptedCollectionObj');
    const newBooking = request.body;
  //  console.log(newBooking)
   let dbObj=  await acceptedCollectionObj.insertOne(newBooking);
    response.status(201).send({message:"Booking Accepted",payload:dbObj});
    
}));
acceptedApp.get('/get-accepted-bookings',expressAsyncHandler(async(request, response)=>{
    const acceptedCollectionObj=request.app.get('acceptedCollectionObj');
    let bookings = await acceptedCollectionObj.find().toArray();
    response.status(201).send({message:'bookings', acceptedbookings: bookings})
}))
module.exports=acceptedApp
