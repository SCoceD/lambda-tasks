const {Router} = require("express");
const router = Router();
const storage = new Map;

router.post('/:route', (req, res) => {
    storage.set(req.params.route, req.body);
    return res.status(200).send('OK');
})

router.get('/:route', (req, res) => {
    if (storage.has(req.params.route)) {
        return res.json(storage.get(req.params.route));
    }
    return res.status(404).send('No route');
})

module.exports = router;
