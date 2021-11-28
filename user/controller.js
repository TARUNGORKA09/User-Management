const services = require("./service")
const crypto = require('crypto')

exports.addUser = addUser;

async function addUser(req,res){
    const body = req.body;
    try{
        let first_name = body.first_name;
        let last_name = body.last_name;
        let email = body.email;
        let password = crypto.createHash('md5').update(body.password).digest('hex')
        
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
        res.send({ERROR : err})
    }
}