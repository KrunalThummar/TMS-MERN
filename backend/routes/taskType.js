const express = require('express');
const routes = express.Router();
const TaskType = require('../models/taskTypeModel');

const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/featchuser');


// ROUTE 1: Creat a Task Type using: POST "/api/task/create". No login required
routes.post('/create', [
    body('taskName', 'Enter a valid taskName').isLength({ min: 1 }),
    body('description', 'Enter a valid description').isLength({ min: 1 }),

], fetchuser, async(req, res)=>{

  // If there are errors then return bad request and show ereor
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success: false, errors: errors.array() });
    }

    try{

      // Check where the Project-Name exist Already
      let taskType = await TaskType.findOne({taskName: req.body.taskName});
      if(taskType){
        return res.status(400).json({success: false, error: "Sorry a Task with this name already exists"});
      }

      //Create a New Project
        taskType = await TaskType.create({
            taskName: req.body.taskName,
            description: req.body.description,
            status: req.body.status,
            createdBy: req.userLogin.id,
        })

        var query = [{path:'createdBy', select:'fullName'}, {path:'updatedBy', select:'fullName'}];

        await TaskType.findOne({_id: taskType._id}).populate(query).exec(function(err, taskType) {
          if (err) {
            // handle error
            console.log(err)
          }
          // users will contain all columns from the Users table and only the roleName, status columns from the Roles table
          res.json({success: true, taskType});
        });


      }catch(error){
        console.log(error.message);
        res.status(500).send({success: false, error: "Internal Server Error;" + error.message})
    }
})


// ROUTE 2: Get/Read a Task Type using: GET "/api/task/fetchalltask". No login required
routes.get('/fetchalltask', fetchuser, async (req, res)=>{

    // If there are errors then return bad request and show ereor
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success: false, errors: errors.array() });
    }

    try{
      var query = [{path:'createdBy', select:'fullName'}, {path:'updatedBy', select:'fullName'}];

        taskType = await TaskType.find({}).populate(query).exec(function(err, taskType) {
          if (err) {
            // handle error
            console.log(err)
          }
          // users will contain all columns from the Users table and only the roleName, status columns from the Roles table
          res.json({success: true, taskType});
        });

    }catch(error){
        console.error(error.message);
        res.status(500).send({success: false, error: "Internal Server Error;" + error.message});
    }
})


// ROUTE 3: Update a Task Type using: PUT "/api/task/updatetask/:id". No login required
routes.put('/updatetask/:id', fetchuser, async (req, res)=>{
    try{

        //Finding Task Type by Id
        let taskType = await TaskType.findById(req.params.id);
        if(!taskType){return res.status(404).send("Not Found")}

        taskType = await TaskType.findByIdAndUpdate(req.params.id, {
            taskName: req.body.taskName,
            description: req.body.description,
            status: req.body.status,
            updatedBy: req.userLogin.id,
            updatedOn: Date.now(),
          }, {new:true})
          
          var query = [{path:'createdBy', select:'fullName'}, {path:'updatedBy', select:'fullName'}];

          await TaskType.findOne({_id: taskType._id}).populate(query).exec(function(err, taskType) {
            if (err) {
              // handle error
              console.log(err)
            }
            // users will contain all columns from the Users table and only the roleName, status columns from the Roles table
            res.json({success: true, taskType});
          });


    }catch(error){
        console.error(error.message);
        res.status(500).send({success: false, error: "Internal Server Error;" + error.message});
    }
})


// ROUTE 4: Delete a Task Type using: DELETE "/api/task/deletetask/:id". No login required
routes.delete('/deletetask/:id', async (req, res)=>{
    try{
        taskType = await TaskType.findByIdAndDelete(req.params.id)
        res.json({success: true, delTask: "Deleted Successfully"});
    }catch(ereor){
        console.error(error.message);
        res.status(500).send({success: true, error: "Internal Server Error;" + error.message});
    }    
})


// ROUTE 5: Get/Read a TaskType - Id, taskName, description using: GET "/api/task/fetchtaskname". No login required
routes.get('/fetchtaskname', async (req, res)=>{

  // If there are errors then return bad request and show ereor
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success: false, errors: errors.array() });
  }

  try{

      await TaskType.find({status: true}).select('_id, taskName').exec(function(err, taskType) {
          // console.log(JSON.stringify(taskType))
          res.json({success: true, taskType})
        });

  }catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error;" + error.message);
  }
})


module.exports = routes