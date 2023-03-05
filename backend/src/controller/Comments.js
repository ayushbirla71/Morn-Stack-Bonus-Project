const commentModel = require("../models/Comments")

exports.CreateComment = async (req,res)=>{
    try {
        const data = req.body
        console.log(data);
        const {PostId,Name,Comment}=data
        if(!Name)res.status(400).send({status:false,message:"Pls provide Name"})
        if(!Comment)res.status(400).send({status:false,message:"Pls provide Comment"})
        const CreateComment = await commentModel.create(data)
        res.status(201).send({status:true,message:"Created Successfully",data:CreateComment})
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}

exports.GetComment = async (req,res)=>{
    try {
        const GetComment = await commentModel.find({isDeleted:false})
        res.status(200).send({status:true,message:"Successfull",data:GetComment})
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}

exports.UpdateComment = async (req,res)=>{
    try {
        const data = req.body
        const {Comment,_id,Reply,Name}=data
        let UpdateComment
        console.log(data);

        if(Reply){
            let obj = {
                Name:Name,
                reply:Reply
            }
            UpdateComment = await commentModel.findByIdAndUpdate(_id,{$push:{Reply:obj}},{new:true})
        }else{
            UpdateComment = await commentModel.findByIdAndUpdate(_id,{$set:{Comment}},{new:true})
        }

        res.status(200).send({status:true,message:"Updated Successfully",data:UpdateComment})
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}

exports.UpdateNestedComment = async (req,res)=>{
    try {
        const data = req.body
        const {Comment,_id,replyId,Name}=data
        let UpdateComment
        console.log(data);
        let totalreply= await commentModel.findById(_id)
        console.log(totalreply);

        let array=totalreply.Reply
        for(let i=0;i<array.length;i++){
            if(array[i]._id==replyId){
                array[i].reply=Comment
            }
        }
        UpdateComment= await commentModel.findByIdAndUpdate(_id,{$set:{Reply:array}},{new:true})
        

        // if(Reply){
        //     let obj = {
        //         Name:Name,
        //         reply:Reply
        //     }
        //     UpdateComment = await commentModel.findByIdAndUpdate(_id,{$push:{Reply:obj}},{new:true})
        // }else{
        //     UpdateComment = await commentModel.findByIdAndUpdate(_id,{$set:{Comment}},{new:true})
        // }

        res.status(200).send({status:true,message:"Updated Successfully",data:UpdateComment})
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}

exports.DeleteComment = async (req,res)=>{
    try {
        const data= req.body
        console.log(data);
        let {_id,replyId}=data
        if(replyId){
            let totalreply = await commentModel.findById(_id)
            if(!totalreply)res.status(404).send({status:false,message:"No reply with this id"})
            let array=totalreply.Reply
            for(let i=0;i<array.length;i++){
                if(array[i]._id==replyId){
                    array.splice(i,1)
                }
            }
            await commentModel.findByIdAndUpdate(_id,{$set:{Reply:array}},{new:true})
        }else{
            await commentModel.findByIdAndUpdate(_id,{$set:{isDeleted:true}},{new:true})
        }
        res.status(200).send({status:true,message:"Deleted Successfully"})
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}