const {Command} = require('commander');
const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');
const BOT_TOKEN = '5434738654:AAFzpAsT6dGonyFOkxnYTqrrynedJ24-0BY';
const MY_CHAT_ID = '5582557630';

const program = new Command();

program.version('0.0.1');

program
    .command('message')
    .argument('<string>', 'message to say')
    .alias('s')
    .action(function (message) {
        axios(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${MY_CHAT_ID}&text=${message}`)
    })

program
    .command('photo')
    .argument('<string>', 'photo to send')
    .alias('s')
    .action(function (message) {
        const formData = new FormData();

        formData.append('chat_id', MY_CHAT_ID);
        formData.append('photo', fs.createReadStream(`${message}`));

        axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, formData, {
            headers: formData.getHeaders(),
        });
    })

program.parse(process.argv);
