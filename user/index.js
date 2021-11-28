const controller = require('./controller')
const validator  = require('./validator')

app.post("/user/addUser",validator.addUser,controller.addUser);
app.post("/user/login",validator.login,controller.login);
app.post("/user/sendOtp",validator.sendOtp,controller.sendOTP)