const axios = require('axios');

const urls = ['https://jsonbase.com/lambdajson_type1/793', 'https://jsonbase.com/lambdajson_type1/955', 'https://jsonbase.com/lambdajson_type1/231', 'https://jsonbase.com/lambdajson_type1/931', 'https://jsonbase.com/lambdajson_type1/93', 'https://jsonbase.com/lambdajson_type2/342', 'https://jsonbase.com/lambdajson_type2/770', 'https://jsonbase.com/lambdajson_type2/491', 'https://jsonbase.com/lambdajson_type2/281', 'https://jsonbase.com/lambdajson_type2/718', 'https://jsonbase.com/lambdajson_type3/310', 'https://jsonbase.com/lambdajson_type3/806', 'https://jsonbase.com/lambdajson_type3/469', 'https://jsonbase.com/lambdajson_type3/258', 'https://jsonbase.com/lambdajson_type3/516', 'https://jsonbase.com/lambdajson_type4/79', 'https://jsonbase.com/lambdajson_type4/706', 'https://jsonbase.com/lambdajson_type4/521', 'https://jsonbase.com/lambdajson_type4/350', 'https://jsonbase.com/lambdajson_type4/64'];
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
