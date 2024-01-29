const mongoose = require('mongoose')
const {Schema} = mongoose;

const taskTypeSchema = new Schema({

    taskName:{
        type : String,
        required : true
    },

    description:{
        type : String,
        required : true
    },
    
    status : {
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

const TaskType = mongoose.model('task', taskTypeSchema);
module.exports = TaskType;