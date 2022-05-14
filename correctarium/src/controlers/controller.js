const {getPrice, getDeadLine} = require("../services/service");

const index = (req, res) => {
    const price = getPrice(req);
    const {time, deadline, deadline_date} = getDeadLine(req);
    res.json({
        price,
        time,
        deadline,
        deadline_date,
    })
}

module.exports = {
    index,
}
