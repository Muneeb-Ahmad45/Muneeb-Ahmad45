    const req = require('express/lib/request');
    const res = require('express/lib/response');
    const Studio = require('../models/Studio');


    exports.getallstudio = async (req ,res)=>{
        await Studio.find().then(result =>{
            res.status(200).send(result);
        }).catch(err =>{
            res.status(201).send(err);
        })
    };
    exports.getstudiobyid = async(req , res)=>{
        const id = req.params.id;
        await Studio.findById({_id: id}).then(result=>{
            res.status(200).send(result)
        }).catch(err =>{
            res.status(201).send(err)
        })
    };
    exports.createstudio = async (req , res)=>{
        
        await Studio.create({
            studio_name:req.body.studio_name,
            app_store_page:req.body.app_store_page,
            team_size:req.body.team_size,
            country: req.body.country,
            user_id: req.body.user_id
        })
        res.status(200).send('Studio Created')
    };
    exports.updatestudio = async(req, res)=>{
        const id = req.params.id
        const old_studio = await Studio.findById({_id: id});
        if(old_studio){
            await Studio.findByIdAndUpdate({_id: id} ,{
            studio_name:req.body.studio_name,
            app_store_page:req.body.app_store_page,
            team_size:req.body.team_size,
            country: req.body.country
                
            })
            res.status(200).send('Studio Updated');
        }else{
            res.status(201).send('Studio not exist')
        }
    };
    exports.deletestudio = async (req , res)=>{
        const id = req.params.id
        const old_studio = await Studio.findById({_id:id})
        if(old_studio){
            await Studio.findByIdAndDelete({_id:id})
            res.status(200).send('Studio Deleted')
        }else{
            res.status(201).send('Cant Delete the Studio')            
        }
    };
