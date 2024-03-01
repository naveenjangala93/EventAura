const { request, response } = require('express');
const exp=require('express');
const userApp=exp.Router();
const verifyToken = require('./verifyToken')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs');

const expressAsyncHandler=require('express-async-handler');

userApp.get('/get-users',expressAsyncHandler(async(request,response)=>{
    //response.send({message:"All users",payload:users})

    const usersCollectionObj=request.app.get('usersCollectionObj');
    let usersList=await usersCollectionObj.find().toArray();
    response.status(200).send({message:'Users',payload:usersList});
})
);
userApp.get('/get-user/:id',expressAsyncHandler(async(request,response)=>{
    let userId = request.params.id

    const usersCollectionObj=request.app.get('usersCollectionObj');
    let userObj=await usersCollectionObj.findOne({MemberID:userId});
    response.status(200).send({message:'User',payload:userObj});

    // let user=users.find(userObj=>userObj.id==userId)
    // if(user)
    // response.send({message:`User with id ${request.params.id}`,payload:user})
    // else response.send('User not Found')
})
);

userApp.use(exp.json());


userApp.post('/signin', expressAsyncHandler(async(request,response)=>{

    const usersCollectionObj=request.app.get('usersCollectionObj');

    const newuser=request.body;
    //console.log(user)

    let userObj=await usersCollectionObj.findOne({username:newuser.username})

    if(userObj===null){
        response.status(200).send({message:"*Invalid username"})
    }
    else{
        
        let isEqual=await bcryptjs.compare(newuser.password,userObj.password);
      if(isEqual==false)
      {
         response.send({message:"*Invalid password"});
      }
        else{
            let jwtToken = jwt.sign({username:userObj.username},'abcdef',{expiresIn:'1d'})
            console.log(userObj.username)
            response.status(201).send({message:"success",user:userObj.name,token:jwtToken})
        }
    }
    
    // users.push(request.body)
    // response.send({message:"User Added"})
})
);


userApp.post('/signup',expressAsyncHandler(async(request,response)=>{


    // const usersCollectionObj=request.app.get('userscollectionObj');

    // const newUser=request.body;
    // console.log(newUser)

    // let userObj=await usersCollectionObj.findOne({MemberID:newUser.MemberID})

    // if(userObj===null){
    //     await usersCollectionObj.insertOne(newUser);
    //     response.status(201).send({message:'Member Added'});
    // }
    // else{
    //     response.status(200).send({message:'Member Already Existed'});
    // }
    // // users.push(request.body)
    // // response.send({message:"User Added"})
    const newUser=request.body;
    console.log(newUser);
    const userCollectionObj = request.app.get("usersCollectionObj");
   let userOfDb =await userCollectionObj.findOne({username:newUser.username})
     //console.log("fhsdfs");
   try{
   if(userOfDb!=null)
   {
      response.send({message:"*User already existed"});
   }
   else{
    // /  hash the password and store the document in the database
      let hashedPassword=await bcryptjs.hash(newUser.password, 9);
      console.log(hashedPassword);
      newUser.password=hashedPassword;
      await userCollectionObj.insertOne(newUser);
      response.status(201).send({message:"user created successfully"});
   }
   }
   catch(err){
      console.log(err);
   }
})
);

userApp.put('/update-user',expressAsyncHandler(async(request,response)=>{

    let modifiedUser=request.body;
    const usersCollectionObj=request.app.get('usersCollectionObj');

    await usersCollectionObj.updateOne({id:modifiedUser.id},{$set:{...modifiedUser}})
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

userApp.delete('/delete-user/:id',(request,response)=>{
    let user = request.params.id;
    console.log(user)
    const usersCollectionObj=request.app.get('usersCollectionObj');
    usersCollectionObj.deleteOne({MemberID:user})
    .then((dbRes)=>{
        console.log(dbRes);
        response.status(201).send({message:'User Deleted'});
    })
    .catch(err=>{
        console.log('err in usercreation',err);
        response.send({message:'Error',errMessage:err.message});
    })
})

module.exports=userApp;