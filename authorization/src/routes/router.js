const {Router} = require("express");
const {MongoClient} = require("mongodb");
const {generateToken, jwt} = require("../services/tokenService");
const authenticateJWT = require("../middlewares/authenticateJWT");
const {JWT_REFRESH_SECRET, JWT_ACCESS_SECRET} = require("../constants/constants");
const authenticateRefreshJWT = require("../middlewares/authenticateRefreshJWT");
const router = Router();
let db;

MongoClient.connect('mongodb://root:pass@localhost:27017', function (err, client) {
    if (err) {
        console.error(err);
    }
    db = client.db('lambda');
})

router.get('/', (req, res) => {
    db.collection('authorization').insertOne({_id: 2, scores: [44, 78, 38, 80]});
    res.send('Hello')
})

router.get('/me:number', authenticateJWT, (req, res) => {
    return res.json({
        request_num: req.params.number,
        data: {
            username: jwt.verify(req.headers.authorization.split(' ')[1], JWT_ACCESS_SECRET, {ignoreExpiration: true}).userEmail
        },
    });
})

router.post('/sign_up', async (req, res) => {
    const {email, password} = req.body;
    if (await db.collection('authorization').findOne({email})) {
        res.send('user already');
    } else {
        const user = {
            email,
            password
        }
        db.collection('authorization').insertOne(user);
        res.send('ok')
    }
})

router.post('/login', async (req, res) => {
    const email = req.query.email;
    const user = await db.collection('authorization').findOne({email});
    const userEmail = user.email;

    if (user && user.password === req.query.password) {
        const {accessToken, refreshToken} = generateToken({userEmail});
        db.collection('authorization').updateOne({email: userEmail}, {$set: {refreshToken: refreshToken}});
        return res.status(200).json({accessToken, refreshToken});
    }

    return res.status(401).send('login or password incorrect');
});

router.post('/refresh', authenticateRefreshJWT, async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const email = jwt.verify(token, JWT_REFRESH_SECRET, {ignoreExpiration: true}).userEmail;
    const user = await db.collection('authorization').findOne({email});

    if (user.refreshToken === token) {
        const {accessToken, refreshToken} = generateToken({email});
        db.collection('authorization').updateOne({email: email}, {$set: {refreshToken: refreshToken}});
        return res.status(200).json({accessToken, refreshToken});
    }

    return res.status(401);
})
module.exports = router;
