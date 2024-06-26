const jwt = require("jsonwebtoken");

const protect = async (req,res, next) =>{
    try {
        if(!req.headers.authorization){
            return res.status(401).send({
                message: "UnAuthrized Access",
                success: false,
            });
        }

        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decode)=>{
            if(err){
                return res.status(200).send({
                    message: "Auth Failed",
                    success: false,
                });
            } else{
                req.body.userId = decode.id;
                next();
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Auth error",
        });
    }
}

module.exports = protect;