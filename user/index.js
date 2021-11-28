const controller = require('./controller')
const validator  = require('./validator')

app.post("/user/addUser",validator.addUser,controller.addUser)