const mongoose=require('mongoose');
const guestSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    age:{
        type:Number,
        min:0,
        required:true

    },
    phone:{
        type:Number,
        min:0,
        required:true
    },
    mail:{
        type:String,
        trim:true,
        required:true
    },
    checkin:{
        type:Date,
        default:null
    },
    checkout:{
       type:Date,
       default:null

    }
})

const Guest=mongoose.model('c1',guestSchema);
module.exports=Guest;