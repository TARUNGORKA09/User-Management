const mysql = require('mysql')

let dbConfig = {
    "host" : "localhost",
    "user" : "root",
    "database" : "user",
    "password" : ""
}

const database = mysql.createPool(dbConfig)

global.database = database
