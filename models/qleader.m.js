// IMPORT DEPENDENCIES
const mongoose = require("mongoose");
const moment = require("moment");

let Schema = mongoose.Schema;

let qLeaderSchema = new Schema({
    user: {
        type: String,
    },
    score : {
        type : Number
    }
    
}, { versionKey: false })

module.exports = mongoose.model("qleader", qLeaderSchema);
