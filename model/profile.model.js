const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName: {
        type: String,
    },
    email:{
        type:String,
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('profiles',profileSchema);