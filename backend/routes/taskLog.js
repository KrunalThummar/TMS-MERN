const express = require('express');
const routes = express.Router();
const TaskLog = require('../models/taskLogModel');

const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/featchuser');

// ROUTE 1: Creat a Task Log using: POST "http://localhost:5000/api/tasklog/create". No login required
routes.post('/create', [
    body('workDescription', 'Enter a valid Work Description').isLength({ min: 1 }),
    body('estHours', 'Enter a valid Est. Hours').isLength({ min: 1 , max: 50 }),
    body('actualHours', 'Enter a valid Actual Hours').isLength({ min: 1 , max: 50 }),
    body('taskCompletionNote', 'Enter a Task Completion Note').isLength({ min: 1 }),    
], fetchuser, async(req, res)=>{

  // If there are errors then return bad request and show ereor
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success: false, errors: errors.array() });
    }

    try{

      // Check where the user exist Already
      let taskLog = await TaskLog.findOne({workDescription: req.body.workDescription});
      if(taskLog){
        return res.status(400).json({success: false, error: "Sorry a user with this Work Description already exists"});
      }

      //Create a New Task Log
        taskLog = await TaskLog.create({
            date: Date.now(),
            userId: req.body.userId,
            leaderId: req.body.leaderId, 
            projectId: req.body.projectId,
            taskTypeId: req.body.taskTypeId,
            taskDescription: req.body.taskDescription,
            workDescription: req.body.workDescription,
            estHours: req.body.estHours,
            actualHours: req.body.actualHours,
            taskCompletionNote: req.body.taskCompletionNote,
            anyDispute: req.body.anyDispute,
            anyDelay: req.body.anyDelay,
            createdBy: req.userLogin.id,
        })

        var query = [{path: 'userId', select: 'fullName'}, {path: 'leaderId', select: 'isLeader'}, {path: 'projectId', select: 'name'}, {path: 'taskTypeId', select: 'taskName'}, {path: 'taskDescription', select: 'description'}, {path:'createdBy', select:'fullName'}, {path:'updatedBy', select:'fullName'}];

        await TaskLog.findOne({_id: taskLog._id}).populate(query).exec(function(err, tasklog) {
          if (err) {
            // handle error
            console.log(err)
          }
          // users will contain all columns from the Users table and only the roleName, status columns from the Roles table
          res.json({success: true, tasklog});
        });

      }catch(error){
        console.log(error.message);
        res.status(500).send({success: false, error: "Internal Server Error;" + error.message})
    }
})


// ROUTE 2: Read/Featch  a Task Log using: GET "/api/tasklog/fetchalltasklogs". No login required
routes.get('/fetchalltasklogs', fetchuser, async (req, res)=>{

    // If there are errors then return bad request and show ereor
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success: false, errors: errors.array() });
    }

    try{

      var query = [{path: 'userId', select: 'fullName'}, {path: 'leaderId', select: 'isLeader'}, {path: 'projectId', select: 'name'}, {path: 'taskTypeId', select: 'taskName'}, {path: 'taskDescription', select: 'description'}, {path:'createdBy', select:'fullName'}, {path:'updatedBy', select:'fullName'}];

      await TaskLog.find({}).populate(query).exec(function(err, tasklog) {
        if (err) {
          // handle error
          console.log(err)
        }
        // users will contain all columns from the Users table and only the roleName, status columns from the Roles table
        res.json({success: true, tasklog});
      });
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error;" + error.message);
    }
})


// ROUTE 3: Update a Task Log using: PUT "/api/tasklog/updatetasklog/:id". No login required
routes.put('/updatetasklog/:id', fetchuser, async (req, res)=>{

    
    try{

       //Finding User Master by Id
        let taskLog = await TaskLog.findById(req.params.id);
        if(!taskLog){return res.status(404).send({success: false, error: "Not Found"})}

  
        //Update All User
        taskLog = await TaskLog.findByIdAndUpdate(req.params.id, {
            userId: req.body.userId,
            leaderId: req.body.leaderId,
            projectId: req.body.projectId, 
            taskTypeId: req.body.taskTypeId,
            taskDescription: req.body.taskDescription,
            workDescription: req.body.workDescription,
            estHours: req.body.estHours,
            actualHours: req.body.actualHours,
            taskCompletionNote: req.body.taskCompletionNote,
            anyDispute: req.body.anyDispute,
            anyDelay: req.body.anyDelay,
            updatedBy: req.userLogin.id,
            updatedOn: Date.now(),
          }, {new:true})

          var query = [{path: 'userId', select: 'fullName'}, {path: 'leaderId', select: 'isLeader'}, {path: 'projectId', select: 'name'}, {path: 'taskTypeId', select: 'taskName'}, {path: 'taskDescription', select: 'description'},  {path:'createdBy', select:'fullName'}, {path:'updatedBy', select:'fullName'}];

          await TaskLog.findOne({_id: taskLog._id}).populate(query).exec(function(err, taskLog) {
            if (err) {
              // handle error
              console.log(err)
            }
            // users will contain all columns from the Users table and only the roleName, status columns from the Roles table
            res.json({success: true, taskLog});
          });

    }catch(error){
        console.error(error.message);
        res.status(500).send({success: false, error: "Internal Server Error;" + error.message});
    }
})


// ROUTE 4: Delete a Task Log using: DELETE "/api/tasklog/deletetasklog/:id". No login required
routes.delete('/deletetasklog/:id', async (req, res)=>{
  try{
      taskLog = await TaskLog.findByIdAndDelete(req.params.id)
      res.json({success: true, delTaskLog: "Delete Successfully"});
  }catch(ereor){
      console.error(error.message);
      res.status(500).send({success: false, error: "Internal Server Error;" + error.message});
  }    
})



module.exports = routes;