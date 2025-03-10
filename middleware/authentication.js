var jwt = require('jsonwebtoken');

var auth = function(req, res, next) {
    try {
        let token = jwt.verify(req.headers.jwt, process.env.privateKey)
        if (token) {
            next()
        } else {
            throw {name:'JsonWebTokenError'};
        }
    } catch (error) {
        if (error.name == 'JsonWebTokenError') {
            // return res.json({status:-1, message: 'Invalid JWT'})
            return res.sendStatus(401);
        }
        else return res.json({ status: 0, message: error.message })
    }
};
module.exports = auth;
