const express = require('express');
const routes = express.Router();
const ProjectMaster = require('../models/projectMasterModel');

const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/featchuser');


// ROUTE 1: Creat a Projects using: POST "/api/project/create". No login required
routes.post('/create', [
    body('name', 'Enter a valid name').isLength({ min: 1 , max: 50 }),
    body('clientName', 'Enter a valid clientName').isLength({ min: 1 , max: 50 }),
    body('displayName', 'Enter a valid displayName').isLength({ min: 1 , max: 50 }),
    body('description', 'Enter a valid description').isLength({ min: 1 }),
    body('projectType', 'Enter a valid projectType').isLength({ min: 1 , max: 50 }),
    body('price', 'Enter a valid price').isLength({ min: 1 , max: 50 }),
], fetchuser, async(req, res)=>{

  // If there are errors then return bad request and show ereor
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success: false, errors: errors.array() });
    }

    try{

      // Check where the Project-Name exist Already
      let projectMaster = await ProjectMaster.findOne({name: req.body.name});
      if(projectMaster){
        return res.status(400).json({success: false, error: "Sorry a Project with this name already exists"});
      }

      //Create a New Project
        projectMaster = await ProjectMaster.create({
            name: req.body.name,
            clientName: req.body.clientName,
            displayName: req.body.displayName,
            description: req.body.description,
            projectType: req.body.projectType,
            price: req.body.price,
            status: req.body.status,
            createdBy: req.userLogin.id,
        })

        var query = [{path:'createdBy', select:'fullName'}, {path:'updatedBy', select:'fullName'}];

        await ProjectMaster.findOne({_id: projectMaster._id}).populate(query).exec(function(err, projectMaster) {
          if (err) {
            // handle error
            console.log(err)
          }
          // users will contain all columns from the Users table and only the roleName, status columns from the Roles table
          res.json({success: true, projectMaster});
        });

      }catch(error){
        console.log(error.message);
        res.status(500).send({success: false, error: "Internal Server Error;" + error.message})
    }
})


// ROUTE 2: Get/Read a Projects using: GET "/api/project/fetchallprojects". No login required
routes.get('/fetchallprojects', fetchuser, async (req, res)=>{

    // If there are errors then return bad request and show ereor
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success: false, errors: errors.array() });
    }

    try{

      var query = [{path:'createdBy', select:'fullName'}, {path:'updatedBy', select:'fullName'}];

        await ProjectMaster.find({}).populate(query).exec(function(err, projectMaster) {
          if (err) {
            // handle error
            console.log(err)
          }
          // users will contain all columns from the Users table and only the roleName, status columns from the Roles table
          res.json({success: true, projectMaster});
        });

    }catch(error){
        console.error(error.message);
        res.status(500).send({success: false, error: "Internal Server Error;" + error.message});
    }
})


// ROUTE 3: Update a Project using: PUT "/api/project/updateproject/:id". No login required
routes.put('/updateproject/:id', fetchuser, async (req, res)=>{
    try{

        //Finding Project Master by Id
        let projectMaster = await ProjectMaster.findById(req.params.id);
        if(!projectMaster){return res.status(404).send("Not Found")}

        projectMaster = await ProjectMaster.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            clientName: req.body.clientName,
            displayName: req.body.displayName,
            description: req.body.description,
            projectType: req.body.projectType,
            price: req.body.price,
            status: req.body.status,
            updatedBy: req.userLogin.id,
            updatedOn: Date.now(),
          }, {new:true})

          var query = [{path:'createdBy', select:'fullName'}, {path:'updatedBy', select:'fullName'}];

          await ProjectMaster.findOne({_id: projectMaster._id}).populate(query).exec(function(err, projectMaster) {
            if (err) {
              // handle error
              console.log(err)
            }
            // users will contain all columns from the Users table and only the roleName, status columns from the Roles table
            res.json({success: true, projectMaster});
          });

    }catch(error){
        console.error(error.message);
        res.status(500).send({success: false, error: "Internal Server Error;" + error.message});
    }
})


// ROUTE 4: Delete a Projext using: DELETE "/api/project/deleteproject/:id". No login required
routes.delete('/deleteproject/:id', async (req, res)=>{
    try{
        projectMaster = await ProjectMaster.findByIdAndDelete(req.params.id)
        res.json({success: true, selProject: "Deleted Successfully"});
    }catch(ereor){
        console.error(error.message);
        res.status(500).send({success: true, error: "Internal Server Error;" + error.message});
    }    
})

// ROUTE 5: Get/Read a Project - Id, name using: GET "/api/project/fetchprojectname". No login required
routes.get('/fetchprojectname', async (req, res)=>{

  // If there are errors then return bad request and show ereor
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success: false, errors: errors.array() });
  }

  try{

      await ProjectMaster.find({status: true}).select('_id, name').exec(function(err, projectMaster) {
          // console.log(JSON.stringify(user))
          res.json({success: true, projectMaster})
        });

  }catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error;" + error.message);
  }
})


module.exports = routes;