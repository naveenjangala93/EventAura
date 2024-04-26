const exp = require('express');
const userApp = exp.Router();
const verifyToken = require('./verifyToken')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs');
const bodyParser = require('body-parser')
const dotenv = require("dotenv").config();
const sendEmail = require('./sendEmail');


userApp.use(bodyParser.json())

userApp.use(exp.json());

const expressAsyncHandler = require('express-async-handler');

userApp.get('/get-users', expressAsyncHandler(async (request, response) => {
  //response.send({message:"All users",payload:users})

  const usersCollectionObj = request.app.get('usersCollectionObj');
  let usersList = await usersCollectionObj.find().toArray();
  response.status(200).send({ message: 'Users', payload: usersList });
})
);
userApp.get('/get-user/:id', expressAsyncHandler(async (request, response) => {
  let userId = request.params.id

  const usersCollectionObj = request.app.get('usersCollectionObj');
  let userObj = await usersCollectionObj.findOne({ MemberID: userId });
  response.status(200).send({ message: 'User', payload: userObj });

  // let user=users.find(userObj=>userObj.id==userId)
  // if(user)
  // response.send({message:`User with id ${request.params.id}`,payload:user})
  // else response.send('User not Found')
})
);

userApp.post('/signin', expressAsyncHandler(async (request, response) => {

  const usersCollectionObj = request.app.get('usersCollectionObj');

  const newuser = request.body;
  //console.log(user)

  let userObj = await usersCollectionObj.findOne({ username: newuser.username })

  if (userObj === null) {
    response.status(200).send({ message: "*Invalid username" })
  }
  else {

    let isEqual = await bcryptjs.compare(newuser.password, userObj.password);
    if (isEqual == false) {
      response.send({ message: "*Invalid password" });
    }
    else {
     // console.log(userObj);
      let jwtToken = jwt.sign({ username: userObj.username }, 'abcdef', { expiresIn: '1d' })
     // console.log(userObj);
      response.status(201).send({ message: "success", username: userObj.username, email: userObj.email, token: jwtToken })
    }
  }

  // users.push(request.body)
  // response.send({message:"User Added"})
})
);

userApp.post('/verify', verifyToken, async (req, res, next) => {
  res.send({ message: "success" });
})
userApp.post('/signup', expressAsyncHandler(async (request, response) => {



  const newUser = request.body;
 // console.log(newUser);
  const userCollectionObj = request.app.get("usersCollectionObj");
  let userOfDb = await userCollectionObj.findOne({ username: newUser.username })
  //console.log("fhsdfs");
  try {
    if (userOfDb != null) {
      response.send({ message: "*User already existed" });
    }
    else {
      // /  hash the password and store the document in the database
      let hashedPassword = await bcryptjs.hash(newUser.password, 9);
      console.log(hashedPassword);
      newUser.password = hashedPassword;
      await userCollectionObj.insertOne(newUser);
      response.status(201).send({ message: "user created successfully" });
    }
  }
  catch (err) {
    console.log(err);
  }
})
);
userApp.post('/getby-username', expressAsyncHandler(async (request, response) => {
  let user = request.body.username;
  console.log(user)
  const userCollectionObj = request.app.get("usersCollectionObj");
  let dbObj = await userCollectionObj.findOne({ username: user });
  console.log(dbObj);
  response.send({ message: "fetched", payload: dbObj });
}))

userApp.put('/update-user', expressAsyncHandler(async (request, response) => {

  let modifiedUser = request.body;
  const usersCollectionObj = request.app.get('usersCollectionObj');

  await usersCollectionObj.updateOne({ id: modifiedUser.id }, { $set: { ...modifiedUser } })
  response.status(201).send({ message: 'User Updated' });
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

userApp.delete('/delete-user/:username', (request, response) => {
  let user = request.params.username;
  //let user=request.body.username;
  console.log(user)
  const usersCollectionObj = request.app.get('usersCollectionObj');
  usersCollectionObj.deleteOne({ username: user })
    .then((dbRes) => {
      console.log(dbRes);
      response.status(201).send({ message: 'User Deleted' });
    })
    .catch(err => {
      console.log('err in usercreation', err);
      response.send({ message: 'Error', errMessage: err.message });
    })
})

userApp.post("/sendemail", async (req, res) => {
  const usersCollectionObj = req.app.get("usersCollectionObj");
  // const email = req.body.email;
  console.log(req.body);
  const user = req.body.username;//username of registered user not actual name
  console.log(user);
  const isaccepted = req.body.accepted;
 // console.log(req.body);
  let dbUser = await usersCollectionObj.findOne({ username: user });

  if (!dbUser) {
    res.send({
      message:
        "*No Account Available with the given UserID.. \nRegister to Continue",
    });
    return;
  }
  const email = dbUser.email;
  console.log(email);

  // if (email !== dbUser.email) {
  //   res.send({
  //     message:
  //       "*Email Doesnot Match \nPlease Enter the corresponding Email of UserID",
  //   });
  //   return;
  // }

  //  const otp = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
  let message_ = ''
  if (isaccepted) {
    message_ = `Your booking for the ${req.body.Event} on ${req.body.date} is confirmed .Furthur details will be contacted by our committe members.Thank you for reaching us!!!
    Please take a moment to share your feedback once the event wraps up, helping us tailor future experiences to your preferences...`
  }
  else {
    message_ = `Your booking for the ${req.body.Event} on ${req.body.date} is cancelled due to unavailabilty of slots .Thank you for reaching us!!`
  }

  try {
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = email;
    const subject = "Event Aura Confirmation Mail";
    const message = message_;

    console.log(message);
    // let token = jwt.sign({ otp: otp }, 'abcdef', {
    //   expiresIn: "5m",
    // });

    // let hashedOtp = await bcryptjs.hash(otp.toString(), 10);

    await sendEmail(subject, message, send_to, sent_from, reply_to);
    //console.log('sent')
    res.status(200).json({
      success: true,
      message: "Email Sent",
    });
  } catch (err) {
    res.status(500).json(new Error("*Incorrect Email"));
  }
});
module.exports = userApp;