const mongoose = require('mongoose');
const {Schema} = mongoose;

const projectMasterSchema = new Schema({

    name:{
        type : String,
        required: true,
        unique: true
    },

    clientName:{
        type : String,
        required : true
    },

    displayName:{
        type : String,
        required : true
    },

    description:{
        type : String,
        required : true
    },

    projectType:{
        type : String,
        required : true
    },

    price:{
        type : Number,
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

const ProjectMaster = mongoose.model('project',projectMasterSchema)
module.exports = ProjectMaster;