const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser')

const PORT = 3000;
global.app = app

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())


require('./database/databse')
require('./user')

http.createServer(app).listen(PORT,()=>{
    console.log(`********SERVER CONNECTED******* @ ${PORT}`)
})


