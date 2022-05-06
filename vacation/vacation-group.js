const vacationList = require("./public/vacationList");
const getNewList = (input) => {
    let resultArr = new Map;
    input.forEach((element) => {
        let result = element.user;
        const weekendDate = {'startDate': element.startDate, 'endDate': element.endDate};
        if (resultArr.has(result._id)) {
            result = resultArr.get(result._id);
            result.weekendDates.push(weekendDate);
        } else {
            result.weekendDates = [weekendDate];
        }
        resultArr.set(result._id, result);
    });
    return Array.from(resultArr.values());
}

getNewList( vacationList
).map((item) => {
    console.log(item);
    }
)
