const jwt = require('jsonwebtoken');
const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = require("../constants/constants");

const generateToken = (payload) => {
    const timeForExpiration = Math.floor(getRandomArbitrary(30, 60));
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: `${timeForExpiration}s`});
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: '2m'});
    return {
        accessToken,
        refreshToken
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = {
    generateToken,
    jwt,
};
