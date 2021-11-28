const mysql = require('mysql')

let dbConfig = {
    "host" : "localhost",
    "user" : "root",
    "database" : "user",
    "password" : ""
}

const database = mysql.createPool(dbConfig)

global.database = database

exports.executeQuery = executeQuery

function executeQuery(sqlQuery,params){
    return new Promise((resolve,reject)=>{
        database.query(sqlQuery, params, function (sqlError, sqlResult) {
            if (sqlError || !sqlResult) {
              if (sqlError) {
                    console.log("################## ERROR #########")
                }else {
                  return reject({ ERROR: sqlError});
                }
            }
            return resolve(sqlResult);
        });
    })   
}