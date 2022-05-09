const {getPrice, getDeadLine} = require("../services/service");

const processRequest = (req, res) => {
    let price = getPrice(req);
    let deadLineObj = getDeadLine(req);
    res.json({
        price: price,
        time: deadLineObj.time,
        deadline: deadLineObj.deadline,
        deadline_date: deadLineObj.deadline_date,
    })
}

module.exports = {
    processRequest,
}
