// IMPORT DEPENDENCIES
const mongoose = require("mongoose");
const moment = require("moment");

let Schema = mongoose.Schema;

let questionSchema = new Schema({
    title: String,
    description: String,
    type: {
        type: String,
    },
    image: {
        type: String,
        required: false
    },
    file_type : String,
    point: {
        type: Number,
        default: 10
    },
    time: {
        type: Number,
        default: 60
    },
    alternatives: [
        {
            text: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: false
            },
        }
    ],
    answer: [{
        type: String,
    }],
    // answered_by: [{
    //     name: {
    //         type: String
    //     },
    //     correct: {
    //         type: Boolean,
    //         default: false
    //     }
    // }],
}, { versionKey: false })

module.exports = mongoose.model("Question", questionSchema);
