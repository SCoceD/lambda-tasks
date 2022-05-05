const csv = require('csv-parser');
const fs = require('fs');
const express = require('express');
const {PATH, PORT} = require("./src/constants");
const app = express();

const ipsMap = new Map;

app.get('/', (req, res) => {
    getIp(req, res);
})

const parseIpList = () => {
    const startTime = Date.now();
    let columns;

    try {
        console.log(PATH);
        fs
            .readFileSync(PATH, 'utf8')
            .split(/\r?\n/)
            .forEach(item => {
                const obj = {};
                const line = item.replace(/"/g, '').split(',');

                if (!columns) {
                    columns = line;
                }

                columns.forEach((key, index) => obj[key] = line[index]);
                ipsMap.set(`${obj.start}-${obj.end}`, obj.countryName);
            })
    } catch (err) {
        console.error(err);
    }

    const end = Date.now();

    console.log(end - startTime);
    return ipsMap;
}

const ip2int = (ip) => {
    return ip.split('.').reduce((accumulator, currentValue) =>
        (accumulator << 8) + parseInt(currentValue, 10), 0) >>> 0;
}

const getIp = (req, res) => {
    const clientIp = req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress;
    const originalIP = ip2int(clientIp);

    const ipKey = [...ipsMap.keys()].find(key => {
        const ips = key.split('-');
        return originalIP >= +ips[0] && originalIP <= +ips[1];
    });

    const countryName = ipsMap.get(ipKey);
    res.json({
        ipInfo: clientIp + (countryName ? ' - ' + countryName : '')
    });
}

parseIpList()
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
