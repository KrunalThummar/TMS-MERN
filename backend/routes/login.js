const express = require('express');
const routes = express.Router();
const Login = require('../models/userMasterModel');


const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/featchuser');

const JWT_SECRET = 'GhostisinwithEveryone';


// ROUTE 1: Creat a User using: POST "/api/auth/create". No login required
routes.post('/create', [
    body('name', 'Enter a valid name').isLength({ min: 1 , max: 50 }),
    body('email', 'Enter a valid email id').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 4 }),
], async(req, res)=>{

  // If there are errors then return bad request and show ereor
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success: false, errors: errors.array() });
    }

    try{

      // Check where the user exist Already
      let userSignin = await Login.findOne({email: req.body.email});
      if(userSignin){
        return res.status(400).json({success: false, error: "Sorry a user with this email already exists"});
      }

      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hash(req.body.password, salt) 

      //Create a New User
        userSignin = await Login.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass, 
        })

        const data = {
            userSignin:{
              id: userSignin.id,
            }
          }
  
          const authToken = jwt.sign(data, JWT_SECRET); 
  
          // res.json(user);
          res.json({success: true, authToken})
       


      }catch(error){
        console.log(error.message);
        res.status(500).send({success: false, error: "Internal Server Error;" + error.message})
    }
})

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
routes.post('/login', [
    body('email', 'Enter a valid email id').isEmail(),
    body('password', 'Password cannot be Blanck').exists(),
  ], async(req, res)=>{ 
    // If there are errors then return bad request and show ereor
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const {email, password} = req.body;
    try{
      let userLogin = await Login.findOne({email});
      if(!userLogin){
        return res.status(400).json({success: false, error: "Please try to login with correct credntials"});
      }
      
      const passwordCompare = await  bcrypt.compare(password, userLogin.password);
      if(!passwordCompare){
        return res.status(400).json({success: false, error: "Please try to login with correct credntials"});
        
      }
  
      const data = {
        userLogin:{
          id: userLogin.id,
          name: userLogin.fullName
        }
      }
      // console.log(data.userLogin.name)
  
    
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ success: true, authtoken })
  
  }catch (error) {
    console.error(error.message);
    res.status(500).send({success: false, error:"Internal Server Error"});
  }
  
  
  });



  // ROUTE 3: Get loggedin User Details using: POST "/api/auth/getlogin". Login required
routes.post('/getlogin',  fetchuser, async (req, res) => {

    try {
      LoginId = req.userLogin.id;
      await Login.findById(LoginId).select('fullName').exec(function(err, login) {
        // console.log(JSON.stringify(roles))
        res.json({success: true, login})
        
      });

    } catch (error) {
      console.error(error.message);
      res.status(500).send({success: false, error:"Internal Server Error"});
    }
    // try {
    //   LoginId = req.userLogin.id;
    //   const userLogin = await Login.findById(LoginId).select("_id, fullName")
    //   res.send({success: true, userLogin})

    //   console.log(userLogin.fullName);

    // } catch (error) {
    //   console.error(error.message);
    //   res.status(500).send({success: false, error:"Internal Server Error"});
    // }
  })



module.exports = routes;