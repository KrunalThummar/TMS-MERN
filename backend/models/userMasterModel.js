const mongoose = require('mongoose');
const {Schema} = mongoose;

const userMasterSchema = new Schema({

    email: {
        type : String,
        required: true,
        unique: true
    },

    password: {
        type : String,
        required : true,
    },

    fullName: {
        type : String,
        required : true,
    },

    RoleId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'role',
    },

    isLeader : {
        type: Boolean,
        default: false
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

const UserMaster = mongoose.model('user', userMasterSchema)
module.exports = UserMaster;