const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");
const {Schema} = mongoose;

const roleMasterSchema = new Schema({

    roleName:{
        type: String,
        required: true,
        unique: true
    },

    status:{
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

const RoleMaster = mongoose.model('role', roleMasterSchema);
module.exports = RoleMaster