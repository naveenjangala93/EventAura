const exp = require('express')
const adminApp= exp.Router();
const verifyToken = require('./verifyToken')
const expressAsyncHandler = require('express-async-handler')
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const bodyparser=require('body-parser');
adminApp.use(bodyparser.json())


adminApp.post('/add-admin',expressAsyncHandler(async(request,response)=>{

     const newUser=request.body;
    console.log(newUser);
    const userCollectionObj = request.app.get("adminCollectionObj");
   let userOfDb =await userCollectionObj.findOne({adminusername:newUser.adminusername})
     //console.log("fhsdfs");
   try{
   if(userOfDb!=null)
   {
      response.send({message:"*Member already existed"});
   }
   else{
    // /  hash the password and store the document in the database
      let hashedPassword=await bcryptjs.hash(newUser.password, 9);
      console.log(hashedPassword);
      newUser.password=hashedPassword;
      await userCollectionObj.insertOne(newUser);
      response.status(201).send({message:"Member created successfully"});
   }
   }
   catch(err){
      console.log(err);
   }

}))
adminApp.post('/admin-login',expressAsyncHandler(async(request,response)=>{


   const committeeCollectionObj=request.app.get('adminCollectionObj');

 const newuser=request.body;
 //console.log(user)

 let userObj=await committeeCollectionObj.findOne({adminusername:newuser.adminusername})

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
         let jwtToken = jwt.sign({adminusername:userObj.adminusername},'abcdef',{expiresIn:'1d'})
         console.log(userObj)
         response.status(201).send({message:"success",adminusername:userObj.adminusername,token:jwtToken})
     }
 }
}))

module.exports=adminApp;