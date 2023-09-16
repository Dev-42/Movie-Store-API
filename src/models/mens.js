const mongoose = require('mongoose')

const menSchema = mongoose.Schema({
    ranking : {
        type : Number,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true,
        trim : true
    },
    dob : {
        type : Date,
        required : true,
        trim : true
    },
    country : {
        type : String,
        required : true,
        trim : true
    },
    score : {
        type : Number,
        required : true,
        trim : true
    },
    event : {
        type : String,
        default : "100"
    },
})

menSchema.index({ranking : 1})

// We are creating a collection with name as "Mens"
const MensRanking = mongoose.model('Men' , menSchema)

module.exports = {MensRanking}