const { request, response } = require('express');
const exp=require('express');
const committeeApp = exp.Router();
const verifyToken = require('./verifyToken')

const expressAsyncHandler=require('express-async-handler');

committeeApp.get('/get-messages', expressAsyncHandler(async(request,response)=>{
    //response.send({message:"All users",payload:users})

    const committeeCollectionObj=request.app.get('committeeCollectionObj');
    let messageList=await committeeCollectionObj.find().toArray();

    response.status(200).send({message:'Messages',payload:messageList});
})
);
committeeApp.get('/get-message/:id',expressAsyncHandler(async(request,response)=>{
    let userId=+request.params.id

    const committeeCollectionObj=request.app.get('committeeCollectionObj');
    let userObj=await committeeCollectionObj.findOne({id:userId});
    response.status(200).send({message:'User',payload:userObj});

    // let user=users.find(userObj=>userObj.id==userId)
    // if(user)
    // response.send({message:`User with id ${request.params.id}`,payload:user})
    // else response.send('User not Found')
})
);

committeeApp.use(exp.json());

committeeApp.post('/create-message', expressAsyncHandler(async(request,response)=>{

    const committeeCollectionObj=request.app.get('committeeCollectionObj');

    const newUser=request.body;

    await committeeCollectionObj.insertOne(newUser);
    response.status(201).send({message:'Message Sent'});
    
    // users.push(request.body)
    // response.send({message:"User Added"})
})
);

committeeApp.put('/update-message',expressAsyncHandler(async(request,response)=>{

    let modifiedUser=request.body;
    const committeeCollectionObj=request.app.get('committeeCollectionObj');

    await committeeCollectionObj.updateOne({id:modifiedUser.id},{$set:{...modifiedUser}})
    response.status(201).send({message:'User Updated'});
    //console.log(result);
    // let index=users.findIndex((userObj)=>userObj.id===request.body.id)
    // if(index!=-1){
    // users.splice(index,1,request.body)
    // response.send({message:"User Updated"})
    // }
    // else{
    //     response.send("User Doesnt Exist..!!")
    // }
})
);

committeeApp.delete('/delete-message/:id',(request,response)=>{
    let userId=+request.params.id;
    const committeeCollectionObj=request.app.get('committeeCollectionObj');
    committeeCollectionObj.deleteOne({id:userId})
    .then((dbRes)=>{
        console.log(dbRes);
        response.status(201).send({message:'Message Deleted'});
    })
    .catch(err=>{
        console.log('err in usercreation',err);
        response.send({message:'Error',errMessage:err.message});
    })
})

module.exports=committeeApp;