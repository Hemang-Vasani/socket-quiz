// IMPORT DEPENDENCIES
const mongoose = require("mongoose");
const moment = require("moment");

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    mobile_number: {
        type: Number,
        unique: true,
        required: true
    },
    clinic_name: {
        type: String,
        default: ""
    },
    point :{ 
        type: Number,
        default: 0
    },
    right: {
        type: Number,
        default: 0
    },
    wrong: {
        type: Number,
        default: 0
    },
    rank: {
        type: Number,
        default : -1
    }
}, { versionKey: false })

module.exports = mongoose.model("User", userSchema);
