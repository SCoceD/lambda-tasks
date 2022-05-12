const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = require("../constants/constants");
const {jwt} = require("../services/tokenService");

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, JWT_REFRESH_SECRET, (err, user) => {
            if (err) {
                console.log(err.message);
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;
