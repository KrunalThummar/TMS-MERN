const express = require('express');
const routes = express.Router();
const UserMaster = require('../models/userMasterModel');

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/featchuser');

const JWT_SECRET = 'GhostisinwithEveryone';

// ROUTE 1: Creat a User using: POST "/api/user/create". No login required
routes.post('/create', [
    body('email', 'Enter a valid email id').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 4 }),
    body('fullName', 'Enter a valid name').isLength({ min: 1 , max: 50 }),
], fetchuser, async(req, res)=>{

  // If there are errors then return bad request and show ereor
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success: false, errors: errors.array() });
    }

    try{

      // Check where the user exist Already
      let userMaster = await UserMaster.findOne({email: req.body.email});
      if(userMaster){
        return res.status(400).json({success: false, error: "Sorry a user with this email already exists"});
      }

      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hash(req.body.password, salt) 

      //Create a New User
        userMaster = await UserMaster.create({
            email: req.body.email,
            password: secPass, 
            fullName: req.body.fullName,
            RoleId: req.body.RoleId, 
            isLeader: req.body.isLeader,
            status: req.body.status,
            createdBy: req.userLogin.id,
        })
 
        var query = [{path: 'RoleId', select: 'roleName'}, {path:'createdBy', select:'fullName'}, {path:'updatedBy', select:'fullName'}];

        await UserMaster.findOne({_id: userMaster._id}).populate(query).exec(function(err, user) {
          if (err) {
            // handle error
            console.log(err)
          }
          // users will contain all columns from the Users table and only the roleName, status columns from the Roles table
          res.json({success: true, user});
        });

      }catch(error){
        console.log(error.message);
        res.status(500).send({success: false, error: "Internal Server Error;" + error.message})
    }
})


// ROUTE 2: Read/Featch  a User using: GET "/api/user/fetchalluser". No login required
routes.get('/fetchalluser', fetchuser, async (req, res)=>{

    // If there are errors then return bad request and show ereor
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success: false, errors: errors.array() });
    }

    try{

      var query = [{path: 'RoleId', select: 'roleName'}, {path:'createdBy', select:'fullName'}, {path:'updatedBy', select:'fullName'}];

      await UserMaster.find({}).populate(query).exec(function(err, users) {
        if (err) {
          // handle error
          console.log(err)
        }
        // users will contain all columns from the Users table and only the roleName, status columns from the Roles table
        res.json({success: true, users});
      });
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error;" + error.message);
    }
})


// ROUTE 3: Update a User using: PUT "/api/user/updateuser/:id". No login required
routes.put('/updateuser/:id', fetchuser, async (req, res)=>{

    
    try{

       //Finding User Master by Id
        let userMaster = await UserMaster.findById(req.params.id);
        if(!userMaster){return res.status(404).send({success: false, error: "Not Found"})}
 
  
        //Update All User
        userMaster = await UserMaster.findByIdAndUpdate(req.params.id, {
            email: req.body.email,
            fullName: req.body.fullName,
            RoleId: req.body.RoleId, 
            isLeader: req.body.isLeader,
            status: req.body.status,
            updatedBy: req.userLogin.id,
            updatedOn: Date.now(),
          }, {new:true})

          var query = [{path: 'RoleId', select: 'roleName'}, {path:'createdBy', select:'fullName'}, {path:'updatedBy', select:'fullName'}];

          await UserMaster.findOne({_id: userMaster._id}).populate(query).exec(function(err, user) {
            if (err) {
              // handle error
              console.log(err)
            }
            // users will contain all columns from the Users table and only the roleName, status columns from the Roles table
            res.json({success: true, user});
          });

    }catch(error){
        console.error(error.message);
        res.status(500).send({success: false, error: "Internal Server Error;" + error.message});
    }
})


// ROUTE 4: Delete a User using: DELETE "/api/user/deleteusers/:id". No login required
routes.delete('/deleteusers/:id', async (req, res)=>{
    try{
        userMaster = await UserMaster.findByIdAndDelete(req.params.id)
        res.json({success: true, delUser: "Delete Successfully"});
    }catch(ereor){
        console.error(error.message);
        res.status(500).send({success: false, error: "Internal Server Error;" + error.message});
    }    
})

// ROUTE 5: Get/Read a User - Id, fullName, isLeader using: GET "/api/user/fetchusername". No login required
routes.get('/fetchusername', async (req, res)=>{

  // If there are errors then return bad request and show ereor
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success: false, errors: errors.array() });
  }

  try{

      await UserMaster.find({status: true}).select('_id, fullName').exec(function(err, user) {
          // console.log(JSON.stringify(user))
          res.json({success: true, user})
        });
 
  }catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error;" + error.message);
  }
})

module.exports = routes; 