const {getPrice, getDeadLine} = require("./service");

test('0 count', () => {
    const req = {
        body: {
            language: 'en',
            mimetype: 'doc',
            count: 0
        }
    }
    expect(getPrice(req)).toEqual(120)
})

test('1000000 count', () => {
    const req = {
        body: {
            language: 'en',
            mimetype: 'doc',
            count: 1000000
        }
    }
    expect(getPrice(req)).toEqual(1200000)
})

test('1000 count and another type of file', () => {
    const req = {
        body: {
            language: 'en',
            mimetype: 'dc',
            count: 1000
        }
    }
    expect(getPrice(req)).toEqual(1440)
})

test('1000 count UKR language', () => {
    const req = {
        body: {
            language: 'ukr',
            mimetype: 'doc',
            count: 1000
        }
    }
    expect(getPrice(req)).toEqual(500)
})

test('1000 count rus language', () => {
    const req = {
        body: {
            language: 'rus',
            mimetype: 'doc',
            count: 1000
        }
    }
    expect(getPrice(req)).toEqual(500)
})

test('1000 count another language', () => {
    const req = {
        body: {
            language: 'rs',
            mimetype: 'doc',
            count: 1000
        }
    }
    expect(() => getPrice(req)).toThrow(TypeError)
})

test('for empty parameters', () => {
    const req = {
        body: {
            language: '',
            mimetype: '',
            count: ''
        }
    }
    expect(() => getPrice(req)).toThrow(TypeError)
})

test('0 counts', () => {
    const req = {
        body: {
            language: 'en',
            mimetype: 'doc',
            count: 0
        }
    }
    expect(getDeadLine(req).time).toEqual(1)
})

test('1000000 counts', () => {
    const req = {
        body: {
            language: 'en',
            mimetype: 'doc',
            count: 1000000
        }
    }
    expect(+getDeadLine(req).time).toEqual(3003.003)
})

test('1000 count ru/ukr', () => {
    const req = {
        body: {
            language: 'ukr',
            mimetype: 'doc',
            count: 1000
        }
    }
    expect(+getDeadLine(req).time).toEqual(1)
})
