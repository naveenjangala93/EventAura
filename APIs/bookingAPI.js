const exp = require('express')
const bookingApp = exp.Router();
const verifyToken = require('./verifyToken')

const expressAsyncHandler = require('express-async-handler')

bookingApp.use(exp.json())

bookingApp.post('/new-booking', expressAsyncHandler(async(request, response)=>{
    const bookingCollectionObj=request.app.get('bookingCollectionObj');
    const newBooking = request.body;
    await bookingCollectionObj.insertOne(newBooking);
    response.status(201).send({message:"Booking Addded"})
    console.log(newBooking)
    
}));

bookingApp.get('/get-bookings',verifyToken,expressAsyncHandler(async(request, response)=>{
    const bookingCollectionObj=request.app.get('bookingCollectionObj');

    let bookings = await bookingCollectionObj.find().toArray();
    response.status(201).send({message:'bookings', bookings: bookings})
}))

module.exports = bookingApp