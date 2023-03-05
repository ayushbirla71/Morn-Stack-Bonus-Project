const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const commentSchema = mongoose.Schema({
    PostId:{type:ObjectId,required:true, ref:'post'},
    Name:{type:String,required:true},
    Comment:{type:String,required:true},
    Reply:[{Name:String,reply:String,status:{type:Boolean,default:false}}],
    isDeleted:{type:Boolean,default:false}
})

module.exports = mongoose.model("comment",commentSchema)