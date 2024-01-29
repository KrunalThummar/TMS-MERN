const express = require('express');
const routes = express.Router();
const RoleMaster = require('../models/roleMasterModel');

const { body, validationResult } = require('express-validator'); 
const { features } = require('process');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/featchuser');

// const JWT_SECRET = 'GhostisinwithEveryone';


// ROUTE 1: Creat a Role using: POST "/api/roles/create". No login required
routes.post('/create',  [
    body('roleName', 'Enter a valid name').isLength({ min: 1 , max: 50 }),
], fetchuser, async(req, res)=>{

    // If there are errors then return bad request and show ereor
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({success: false, errors: errors.array() });
      }

      
      try{
        
        // Check where the roleName exist Already
        let roleMaster = await RoleMaster.findOne({roleName: req.body.roleName});
        if(roleMaster){
            return res.status(400).json({success: false, error: "Sorry a user with this Name already exists"});
        }

        

        //Create a New User
        roleMaster = await RoleMaster.create({
            roleName: req.body.roleName,
            status: req.body.status,
            createdBy: req.userLogin.id,
          })

          var query = [{path:'createdBy', select:'fullName'}, {path:'updatedBy', select:'fullName'}];

          await RoleMaster.findOne({_id: roleMaster.id}).populate(query).exec(function(err, roleMaster) {
            if (err) {
              // handle error
              console.log(err)
            }
            // users will contain all columns from the Users table and only the roleName, status columns from the Roles table
            res.json({success: true, roleMaster});
          });

        //   res.json({success: true, roleMaster})
          
        }catch(error){
          console.log(error.message);
          res.status(500).send({success: false, error: "Internal Server Error;" + error.message})
      }
})


// ROUTE 2: Get/Read a Role using: GET "/api/roles/fetchallroles". No login required
routes.get('/fetchallroles', fetchuser, async (req, res)=>{

    // If there are errors then return bad request and show ereor
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success: false, errors: errors.array() });
    }

    try{

      var query = [{path:'createdBy', select:'fullName'}, {path:'updatedBy', select:'fullName'}];

      roleMaster = await RoleMaster.find({}).populate(query).exec(function(err, roleMaster) {
            if (err) {
              // handle error
              console.log(err)
            }
            // users will contain all columns from the Users table and only the roleName, status columns from the Roles table
            res.json({success: true, roleMaster});
            // console.log(roleMaster.createdBy);
        });
    }catch(error){
        console.error(error.message);
        res.status(500).send({success: true, error: "Internal Server Error;" + error.message});
    }
})


// ROUTE 3: Update a Role using: PUT "/api/roles/updateroles/:id". No login required
routes.put('/updateroles/:id', fetchuser, async (req, res)=>{
    try{
        let roleMaster = await RoleMaster.findById(req.params.id);
        if(!roleMaster){return res.status(404).send("Not Found")}

        roleMaster = await RoleMaster.findByIdAndUpdate(req.params.id, {
            roleName: req.body.roleName,
            status: req.body.status,
            updatedBy: req.userLogin.id,
            updatedOn: Date.now(),
          }, {new:true})
        

          var query = [{path:'createdBy', select:'fullName'}, {path:'updatedBy', select:'fullName'}];

          await RoleMaster.findOne({_id: roleMaster.id}).populate(query).exec(function(err, roleMaster) {
            if (err) {
              // handle error
              console.log(err)
            }
            // users will contain all columns from the Users table and only the roleName, status columns from the Roles table
            res.json({success: true, roleMaster});
          });
    }catch(error){
        console.error(error.message);
        res.status(500).send({success: true, error: "Internal Server Error;" + error.message});
    }
})


// ROUTE 4: Delete a Role using: DELETE "/api/roles/deleteroles/:id". No login required
routes.delete('/deleteroles/:id', async (req, res)=>{
    try{
        roleMaster = await RoleMaster.findByIdAndDelete(req.params.id)
        res.json({success: true, res: "Delete Successfully"});
    }catch(ereor){
        console.error(error.message);
        res.status(500).send({success: false, error: "Internal Server Error;" + error.message});
    }    
})


// ROUTE 5: Get/Read a Role - Id, roleName using: GET "/api/roles/fetchactiveroles". No login required
routes.get('/fetchactiveroles', async (req, res)=>{

    // If there are errors then return bad request and show ereor
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success: false, errors: errors.array() });
    }

    try{

        await RoleMaster.find({status: true}).select('_id, roleName').exec(function(err, roles) {
            // console.log(JSON.stringify(roles))
            res.json({success: true, roles})
          });

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error;" + error.message);
    }
})

module.exports = routes;