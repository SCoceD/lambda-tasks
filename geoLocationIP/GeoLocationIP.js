const csv = require('csv-parser');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

const path = __dirname + '/public/IP2LOCATION-LITE-DB1.CSV';
const ipList = new Map;

app.get('/', (req, res) => {
    let result = req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress ||
        null;
    let clientIP = ip2int(result);
    ipList.forEach(item => {
        if (clientIP >= +item.start && clientIP <= +item.end) {
            result += ' ' + item.countryName + ' ';
        }
    })
    res.send(result);
})

const parseIpList = () => {
    const date = Date.now();
    // fs.createReadStream(path)
    //     .pipe(csv())
    //     .on('data', (row) => {
    //         ipList.set(row.start, row)
    //     })
    //     .on('end', () => {
    //     })
    let columns;
    fs.readFileSync(path, 'utf8').split(/\r?\n/).forEach((item, indexs) => {
        let o = {};
        item = Array.from(item.replace(/"/g, '').split(','));
        if (!columns) {
            columns = item;
        }
        columns.forEach(async (element, index) => {
            Object.defineProperty(o, element, {
                value: item[index],
                writable: true,
                enumerable: true,
                configurable: true
            })
        });
        ipList.set(o.start, o)
    })
    console.log(Date.now() - date);
}

const ip2int = (ip) => {
    return ip.split('.').reduce(function(ipInt, octet) { return (ipInt<<8) + parseInt(octet, 10)}, 0) >>> 0;
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    parseIpList()
})
