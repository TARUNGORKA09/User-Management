const constant = require('../constants/constants')

exports.addUser = addUser;

function addUser(opts){
    return new Promise((resolve,reject)=>{
        let table_name = constant.USER.ADD_USER_TABLE
        let sqlQuery = `INSERT INTO ${table_name} SET ? `
        let params = [opts]
        var query = database.query(sqlQuery, params, function (sqlError, sqlResult) {
            if (sqlError || !sqlResult) {
              if (sqlError) {
                if (!noErrorlog) {
                    console.log("################## ERROR #########")
                }else {
                  return reject({ ERROR: sqlError});
                }
              }
            }
            return resolve(sqlResult);
        });
    });
}