const mongoose = require('mongoose')
const {Schema} = mongoose;

const taskLogSchema = new Schema({

    date: {
        type: Date,
        default: Date.now
    },

    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    
    leaderId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    
    projectId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'project',
    },

    taskTypeId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'task',
    },
    
    taskDescription: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'task',
    },
    
    workDescription: {
        type : String,
        required : true
    },

    estHours : {
        type : Number,
        required : true
    },

    actualHours: {
        type : Number,
        required : true
    },

    taskCompletionNote: {
        type : String,
        required : true
    },

    anyDispute : {
        type: Boolean,
        default: false
    },

    anyDelay : {
        type: Boolean,
        default: false
    },

    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    createdOn:{
        type: Date,
        default: Date.now
    },

    updatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    updatedOn:{
        type: Date,
        default: Date.now
    }

})

const TaskLog = mongoose.model('taskLog', taskLogSchema);
module.exports = TaskLog;