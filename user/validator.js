const joi = require('joi')

exports.addUser = addUser;
exports.login = login;
exports.sendOtp = sendOtp;

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
        res.send({ERROR : err, MSG : "Validation Error"})
    }
}

function login(req,res,next){
    console.log("LOGIN REQUEST RECEIVED")
    try{
        const schema = joi.object().keys({
            email : joi.string().required(),
            password : joi.string().required()
        })
        let validation = schema.validate(req.body);
        if(validation.error){
            throw new Error("User validation error")
        }
        return next()
    }catch(err){
        console.log(`********** ${err} ***********`);
        res.send({ERROR : err , MSG : "something went wrong"})
    }
}

function sendOtp(req,res,next){
    console.log("SEND OTP REQUEST RECEIVED")
    try{
        const schema = joi.object().keys({
            email : joi.string().required(),
        })
        let validation = schema.validate(req.body);
        if(validation.error){
            throw new Error("User validation error")
        }
        return next()
    }catch(err){
        console.log(`********** ${err} ***********`);
        res.send({ERROR : err , MSG : "something went wrong"})
    }
}