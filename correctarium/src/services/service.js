const {
    MIN_EN, MIN_UKR_RUS, MIME_TYPE, MULTIPLICATION_FOR_OTHER_FILE_TYPE, EN_PRICE, UKR_RUS_PRICE,
    ONE_HOUR_IN_SECONDS, START_WORKING_DAY, END_WORKING_DAY, MS_iN_MINUTE, MS_IN_HOUR,
    EN_MS_FOR_ONE_CHAR, UKR_RUS_MS_FOR_ONE_CHAR
} = require("../constants/constants");
const moment = require("moment");


const getPrice = (req) => {
    const multiplicator = MIME_TYPE.includes(req.body.mimetype) ? 1 : MULTIPLICATION_FOR_OTHER_FILE_TYPE;
    const priceForOneChar = req.body.language === 'en' ? EN_PRICE : UKR_RUS_PRICE;
    const minPrice = (req.body.language === 'en' ? MIN_EN : MIN_UKR_RUS) * multiplicator;
    let result = req.body.count * priceForOneChar * multiplicator;
    result = result > minPrice ? result : minPrice;
    return result;
}

const getDeadLine = (req) => {
    const multiplicator = MIME_TYPE.includes(req.body.mimetype) ? 1 : MULTIPLICATION_FOR_OTHER_FILE_TYPE;

    const MsForOneChar = req.body.language === 'en' ? EN_MS_FOR_ONE_CHAR : UKR_RUS_MS_FOR_ONE_CHAR;

    let timeForProcess = MsForOneChar * req.body.count * multiplicator;

    timeForProcess = timeForProcess < ONE_HOUR_IN_SECONDS ? ONE_HOUR_IN_SECONDS : timeForProcess
    const dataOfEndOfTheWork = getDeadLineFormattedDate(timeForProcess);
    return {
        'time': timeForProcess / MS_IN_HOUR < 1 ? 1 : (timeForProcess / MS_IN_HOUR).toFixed(3),
        'deadline': moment(dataOfEndOfTheWork).unix(),
        'deadline_date': dataOfEndOfTheWork
    };
}

function getDeadLineFormattedDate(timeToWork, currentDate) {
    let result;
    currentDate = currentDate !== undefined ? currentDate : moment();
    if (currentDate.day() > 5 || currentDate.day() < 1 || currentDate.hour() < START_WORKING_DAY || currentDate.hour() >= END_WORKING_DAY) {
        while (currentDate.day() > 5 || currentDate.day() < 1 || currentDate.hour() < START_WORKING_DAY || currentDate.hour() >= END_WORKING_DAY) {
            currentDate.add(1, 'h')
        }
        currentDate = currentDate.set({
            minute: 0,
            second: 0,
        });
    }
    let timeToEndOfTheDay = (END_WORKING_DAY * MS_IN_HOUR - ((currentDate.hour() * MS_IN_HOUR) + (currentDate.minute() * MS_iN_MINUTE) + (currentDate.second() * 1000)));
    if (timeToWork < timeToEndOfTheDay) {
        result = currentDate + timeToWork;
    } else {
        timeToWork = timeToWork - timeToEndOfTheDay
        currentDate = currentDate + timeToEndOfTheDay;

        return getDeadLineFormattedDate(timeToWork, moment(currentDate));
    }

    return moment(result).format("DD/MM/yyyy HH:mm:ss");
}

module.exports = {
    getPrice,
    getDeadLine,
}
