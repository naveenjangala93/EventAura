const exp = require('express')
const feedbackApp= exp.Router();
const verifyToken = require('./verifyToken')
const expressAsyncHandler = require('express-async-handler')
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const bodyparser=require('body-parser');
feedbackApp.use(bodyparser.json())

feedbackApp.post('/create-feedback', expressAsyncHandler(async(request, response)=>{
  const feedbackCollection=request.app.get('feedbackCollectionObj');
  console.log(request.body)
    const feedback= request.body;
    let eventinFeedback=feedback.eventType
    console.log(eventinFeedback)
        let rating=feedback.rating;
        console.log(rating)
        if(rating===1)
        await feedbackCollection.updateOne({event:eventinFeedback},{$inc:{onec:1}});
        else if(rating===2)
        await feedbackCollection.updateOne({event:eventinFeedback},{$inc:{twoc:1}});
        else if(rating===3)
        await feedbackCollection.updateOne({event:eventinFeedback},{$inc:{threec:1}});
        else if(rating===4)
        await feedbackCollection.updateOne({event:eventinFeedback},{$inc:{fourc:1}});
        else if(rating===5)
        await feedbackCollection.updateOne({event:eventinFeedback},{$inc:{fivec:1}});
       
       response.send({message:"Updated successfully"});
}));
feedbackApp.get('/get-feedback',expressAsyncHandler(async(request, response)=>{
    const feedbackCollection=request.app.get('feedbackCollectionObj');
    let feedbacks = await feedbackCollection.find().toArray();
    response.status(201).send({message:'feedbacks', feedbacks: feedbacks})
}))

module.exports=feedbackApp