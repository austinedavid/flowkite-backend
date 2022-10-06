const jwt =  require("jsonwebtoken");

const verification = (req, res, next)=>{
    const returnToken = req.headers.token

    const token = returnToken.split(" ")[1];
    
    if(!token){
        return res.send('you are not logged in')
    }

    jwt.verify(token, process.env.JWT__TOKEN, (err, user)=>{
        if(err){
            return res.send('you are not verified, please signin')
        }
         req.user = user

         next()
    })
}
module.exports = {verification}