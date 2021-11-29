const services = require("./service")
const crypto = require('crypto')
const _ = require('underscore')

exports.addUser = addUser;
exports.login = login;
exports.sendOTP = sendOTP;
exports.verifyOtp = verifyOtp;

async function addUser(req,res){
    const body = req.body;
    try{
        let first_name = body.first_name;
        let last_name = body.last_name;
        let email = body.email;
        let password = crypto.createHash('md5').update(body.password).digest('hex')

        let duplicate_email = await services.checkDuplicateEmail(email);
        if(duplicate_email){
            throw new Error("Email already registered");
        }
        
        let insertObj = {
            first_name,
            last_name,
            email,
            password,
        }
        const insertResult = await services.addUser(insertObj)
        let respObj = {
            message : "ACTION COMPLETE",
            status : "200",
            data : insertResult.insertId
        }
        res.send(respObj)
    }catch(err){
        console.error(`ERROR : ${err}`)
        res.send({ERROR : err.message})
    }
}

async function login(req,res){
    const body = req.body
    try{
        let password = body.password;
        let email = body.email;
        let obj = {
            password,
            email
        }
        let referenceData = await services.getPassword(obj)
        
        let hashed_password = crypto.createHash('md5').update(password).digest('hex');
        if(referenceData[0].password == hashed_password){
            res.send({
                message : "succesfull",
                valid : true
            })
        }else {
            throw new Error("Invalid Password")
        }
    }catch(err){
        res.send({ERROR : err.message})
    }
}

async function sendOTP(req,res){
  const body = req.body;
  try{
    let email = body.email;
    let OTP = (Math.random()*1000000).toFixed(0);
    let result = await services.sendEmail(email,OTP)
    if(_.isEmpty(result)){
        throw new Error("Something went wrong")
    }
    result.OTP = crypto.createHash('md5').update(OTP).digest('hex');
    await services.saveOTP(result);
    res.send({
       message  : "Successful",
       valid : true
    })
  }catch(err){
    res.send({ERROR : err.message})
  }
}

async function verifyOtp(res,req){
    const body = req.body;
    try{
        let otp = body.otp;
        let email = body.email;

        let obj = {
            otp,
            email
        }

        let db_password = await services.getOtp(obj)
        if(_.isEmpty(hashed_password)){
            throw new Error("Oops!!Something went wrong!")
        }
        let hashed_password = crypto.createHash('md5').update(otp).digest('hex');
        if(hashed_password == db_password){
            return {
                message : "successful",
                status : 200
            }
        }
    }catch(err){
        console.log("Error : ",err)
        res.send({Error : err.message})
    }
}