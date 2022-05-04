const axios = require('axios');

let trueValue = 0;
let falseValue = 0;


const start =  () => {
    return isDone().map((item) => {
        return axios.get(item).then(res => {
            console.log(item + ': isDone - ' + getIsDone(res.data))
        })
    });
}

(async () => {
    await Promise.all(start());
    console.log(trueValue);
    console.log(falseValue);
})()

function getIsDone(element) {
    let result;
    if (element.hasOwnProperty('isDone')) {
        result = element.isDone;
        if (element.isDone) trueValue++;
        else falseValue++;
    } else {
        for (let item in element) {
            if (typeof element[item] === 'object') {
                result = getIsDone(element[item]);
                if (result !== undefined) return result;
            }
        }
    }
    return result;
}

function isDone() {
    return [
        'https://jsonbase.com/lambdajson_type1/793',
        'https://jsonbase.com/lambdajson_type1/955',
        'https://jsonbase.com/lambdajson_type1/231',
        'https://jsonbase.com/lambdajson_type1/931',
        'https://jsonbase.com/lambdajson_type1/93',
        'https://jsonbase.com/lambdajson_type2/342',
        'https://jsonbase.com/lambdajson_type2/770',
        'https://jsonbase.com/lambdajson_type2/491',
        'https://jsonbase.com/lambdajson_type2/281',
        'https://jsonbase.com/lambdajson_type2/718',
        'https://jsonbase.com/lambdajson_type3/310',
        'https://jsonbase.com/lambdajson_type3/806',
        'https://jsonbase.com/lambdajson_type3/469',
        'https://jsonbase.com/lambdajson_type3/258',
        'https://jsonbase.com/lambdajson_type3/516',
        'https://jsonbase.com/lambdajson_type4/79',
        'https://jsonbase.com/lambdajson_type4/706',
        'https://jsonbase.com/lambdajson_type4/521',
        'https://jsonbase.com/lambdajson_type4/350',
        'https://jsonbase.com/lambdajson_type4/64'
    ]
}
