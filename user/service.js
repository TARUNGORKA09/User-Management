
const constant = require('../constants/constants')
const database = require('../database/database')
const nodemailer = require('nodemailer');

exports.addUser = addUser;
exports.getPassword = getPassword;
exports.checkDuplicateEmail = checkDuplicateEmail;
exports.saveOTP = saveOTP;
exports.sendEmail = sendEmail;
exports.getOtp = getOtp

async function addUser(opts){
  let table_name = constant.USER.ADD_USER_TABLE;
  let params = [opts]
  let sqlQuery = `INSERT INTO ${table_name} SET ? `
  var queryResult = await database.executeQuery(sqlQuery,params);
  return queryResult;
}

async function getPassword(opts){
  let table_name = constant.USER.ADD_USER_TABLE;
  let sqlQuery = `SELECT * FROM ${table_name} WHERE email = ?`;
  let params = [];
  params.push(opts.email)
  let queryResult = await database.executeQuery(sqlQuery,params);
  return queryResult;
}

async function checkDuplicateEmail(email){
  let table_name = constant.USER.ADD_USER_TABLE;
  let sqlQuery = `SELECT * FROM ${table_name} WHERE email = ?`;
  let params = [];
  params.push(email);
  let queryResult = await database.executeQuery(sqlQuery,params);
  if(queryResult){
    return true
  }
}

async function saveOTP(opts){
  let insertObj = {
    otp : opts.OTP,
    email : opts.accepted[0]
  }
  let table_name = constant.USER.USER_OTP;
  let sqlQuery = `INSERT INTO ${table_name} SET ? ON DUPLICATE KEY UPDATE email = ? , otp = ? `;
  let params = [insertObj,insertObj.email,insertObj.otp];
  let queryResult = await database.executeQuery(sqlQuery,params);
  return queryResult
}

async function sendEmail(email,OTP){
  return new Promise((resolve,reject) => {
    let mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'tarungorka2000@gmail.com',
          pass: 'Tarun@8886'
      }
    });
    let mailDetails = {
      from: 'userloginAuthenticator@gmail.com',
      to: email,
      subject: '** OTP **',
      text: `Your OTP is : ${OTP}, it will expire in mins \n\n Thankyou`
    };
    mailTransporter.sendMail(mailDetails, function(err, data) {
      if(err) {
           return reject(err)
      } else {
         return resolve(data)
      }
  });
  })
}

async function getOtp(opts){
  let table_name = constant.USER.USER_OTP;
  let sqlQuery = `SELECT * FROM ${table_name} WHERE email = ?`;
  let params = [];
  params.push(opts.email)
  let queryResult = await database.executeQuery(sqlQuery,params);
  return queryResult.otp;
}