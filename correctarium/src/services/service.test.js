const processRequest = require('./service');
const {getPrice} = require("./service");
const moment = require("moment");

test('at 19 in friday', () => {
    const req = {
        body: {
            language: 'en',
            mimetype: 'doc',
            count: 1000
        }
    }
    expect(getPrice(req)).toEqual({
        price: 120,
        time: 1,
        deadline: moment().add(1, 'hour').format('x'),
        deadline_date: moment().add(1, 'hour')
    })
})
// test('at 19 in friday', () => {
//     const req = {
//         body: {
//             language: 'en',
//             mimetype: 'doc',
//             count: 1000
//         }
//     }
//     expect(getPrice(req)).toBe({
//
//     })
// })
