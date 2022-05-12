const jwt = require('jsonwebtoken');
const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = require("../constants/constants");

const generateToken = (payload) => {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET,{expiresIn: '30s'})
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET,{expiresIn: '1m'})
    return{
        accessToken,
        refreshToken
    }
}

module.exports = {
    generateToken,
    jwt,
};
