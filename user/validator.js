const joi = require('joi')

exports.addUser = addUser;

function addUser(req,res,next){
    console.log(`ADD USER REQUEST RECEIVED`)
    try{
        const schema = joi.object().keys({
            first_name : joi.string().required(),
            last_name : joi.string().required(),
            email : joi.string().required(),
            password : joi.string().required() 
        })
        let validation = schema.validate(req.body);
        if(validation.error){
            throw new Error("User validation error")
        }
        return next()
    }catch(err){
        console.error(`******* ${err} *******`)
    }
}