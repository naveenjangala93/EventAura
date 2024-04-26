const exp = require('express')
const bookingApp = exp.Router();
const verifyToken = require('./verifyToken')
const expressAsyncHandler = require('express-async-handler');
const { ObjectId } = require('mongodb');
bookingApp.use(exp.json())
bookingApp.post('/new-booking', expressAsyncHandler(async(request, response)=>{
    const bookingCollectionObj=request.app.get('bookingCollectionObj');
    const newBooking = request.body;
    await bookingCollectionObj.insertOne(newBooking);
    response.status(201).send({message:"Booking Addded"})
    console.log(newBooking)
}));
bookingApp.get('/get-bookings',expressAsyncHandler(async(request, response)=>{
    const bookingCollectionObj=request.app.get('bookingCollectionObj');
    let bookings = await bookingCollectionObj.find().toArray();
    response.status(201).send({message:'bookings', bookings: bookings})
}))
bookingApp.post('/delete-booking',(request,response)=>{
    let id = request.body._id;
    const objectIdToDelete = new ObjectId(id);
   //let user=request.body.username;
    //console.log(user)
    const usersCollectionObj=request.app.get('bookingCollectionObj');
    usersCollectionObj.deleteOne({_id:objectIdToDelete})
    .then((dbRes)=>{
        console.log(dbRes);
        response.status(201).send({message:'User Deleted'});
    })
    .catch(err=>{
        console.log('err in usercreation',err);
        response.send({message:'Error',errMessage:err.message});
    })
})
module.exports = bookingApp
