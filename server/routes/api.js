const express=require('express');
const router=express.Router();
const jwt = require('jsonwebtoken');
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/authentication',{useNewUrlParser:true}).then(()=>{console.log("connected to mongoDB");});

const userSchema=new mongoose.Schema({
    email:String,
    password:String
});
const users=mongoose.model('user',userSchema);

let response={
    status:200,
    data:[],
    message:null
}

const sendError=(err,res)=>{
    response.status=501,
    response.message=typeof err =='object' ? err.message:err;
    res.status(501).json(response);
}

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

router.post('/signup',(req,res)=>{
    // var userDetails=new user(req.body);
    // userDetails.save()
    //     .then(item=>{
    //         res.json(userDetails);
    //     })
    //     .catch(err=>{
    //         releaseEvents.status(400).send("unable to save to database");
    //     });
    let userData = req.body
    let user = new users(userData)
    user.save((err, registeredUser) => {
      if (err) {
        console.log(err)      
      } else {
        let payload = {subject: registeredUser._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    })
});




router.post('/login',(req,res)=>{
    // user.findOne({email:req.body.email,password:req.body.password}).then((result)=>{
    //     response.data=result;
    //     res.json(response);
    
    // })
    // .catch((err)=>{
    //     sendError(err,res);
    // });
    let userData = req.body
  users.findOne({email: userData.email}, (err, user) => {
    if (err) {
      console.log(err)    
    } else {
      if (!user) {
        res.status(401).send('Invalid Email')
      } else 
      if ( user.password !== userData.password) {
        res.status(401).send('Invalid Password')
      } else {
        let payload = {subject: user._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    }
  })
});
router.get('/movies',verifyToken,(req,res)=>{
  res.send({"name":"sai"});
});



module.exports=router;