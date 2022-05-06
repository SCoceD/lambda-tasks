const axios = require('axios');
const jsonSortingList = require("./public/jsonSortingList");

const urls = jsonSortingList;
let trueValue = 0;
let falseValue = 0;

const start = () => urls.map(item => axios.get(item).then(res => {
    const isDone = hasValue(res.data);
    calculateIsDone(isDone);
    console.log(item + ': isDone - ' + isDone);
}));

const calculateIsDone = isDone => {
    if (isDone) {
        trueValue++;
        return;
    }
    falseValue++;
}

const hasValue = data => {
    return Object.values(data).some(value => {
        if (typeof value === 'boolean') {
            return value;
        }
        if (Array.isArray(value)) {
            return value.some(obj => {
                return hasValue(obj);
            })
        }
        if (typeof value === 'object') {
            return hasValue(value);
        }
    });
}

const promises = start();

Promise.all(promises).then(r => {
    console.log(trueValue);
    console.log(falseValue);
});
