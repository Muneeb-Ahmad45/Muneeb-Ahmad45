const req = require('express/lib/request');
const res = require('express/lib/response');
const Videos = require('../models/Video');
const path = require('path');




exports.getallvideos = (req ,res)=>{
    Videos.find().then(result=>{
        res.status(200).send(result)
    }).catch(err =>{
        res.status(404).send(err)
    })
};
exports.getvideobyid = (req, res)=>{
    const id = req.params.id

    Videos.findById({_id: id}).then(result =>{
        res.status(200).send(result)
    }).catch(err =>{
        res.status(404).send(err)
    })
};

exports.addvideo = async(req , res , next)=>{
   try{
    //    console.log(req.files)
   
    if(!req.body){
        res.status(201).send("All information is required")

    }else{
        video_obj = []
        for(i=0 ; i< req.files.length ;i++)
        {
            let obj = {
                path: req.files[i].path
            }
            video_obj.push(obj)

        }
       await Videos.create({
            video : video_obj
        })
        res.status(200).send('video edited');
    }
   } catch(err){
    next(err)
    console.log(err.message)
    res.status(200).json({
        status: false,
        message: "Something went wrong please try again later" 
    })
   } 
   
};

exports.updatevideo = async(req , res)=>{
    const id = req.params.id
   const oldvideo =await Videos.findById({_id : id})
   if(oldvideo){
      await Videos.updateOne({_id:id},
           {video: req.files.path
       })
       res.status(200).send("Video Updated")
   }else{
       res.status(201).send('Video Does not exist')
   }
};
exports.deletevideo = async(req , res )=>{
    const id = req.params.id
    const delete_video =await Videos.findById({_id:id})
    if(delete_video){
      await  Videos.deleteOne({
                _id:id
        })
        res.status(200).send('Video Deleted Successfully')
    }else(err =>{
        res.send(err);
    })
};