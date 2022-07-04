"use strict";
const {Telegraf} = require("telegraf");
const request = require('request');
const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');
const IMAGE_PATH = 'google.png';
const BOT_TOKEN = '5434738654:AAFzpAsT6dGonyFOkxnYTqrrynedJ24-0BY';
const MY_CHAT_ID = '5582557630';

//
// Создать бота с полученным ключом
const bot = new Telegraf("5434738654:AAFzpAsT6dGonyFOkxnYTqrrynedJ24-0BY");
//
// Обработчик начала диалога с ботом
bot.start((ctx) =>
    ctx.reply(
        `Приветствую, ${
            ctx.from.first_name ? ctx.from.first_name : "хороший человек"
        }! Набери /help и увидишь, что я могу.`
    )
);
//
// Обработчик команды /help
bot.help((ctx) => ctx.reply("Справка в процессе"));
//
// Обработчик команды /whoami
bot.command("whoami", (ctx) => {
    const {id, username, first_name, last_name} = ctx.from;
    return ctx.replyWithMarkdown(`Кто ты в телеграмме:
*id* : ${id}
*username* : ${username}
*Имя* : ${first_name}
*Фамилия* : ${last_name}
*chatId* : ${ctx.chat.id}`);
});

bot.on("text", async (ctx) => {
    if (ctx.message.text === 'photo') {
        let download = await function (uri, filename, callback) {
            request.head(uri, function (err, res, body) {
                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
        };

        await download('https://picsum.photos/200/300', 'google.png', function () {
            console.log('done');
        });
        const formData = new FormData();

        formData.append('chat_id', MY_CHAT_ID);
        formData.append('photo', fs.createReadStream(`${IMAGE_PATH}`));

        axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, formData, {
            headers: formData.getHeaders(),
        });
    }
    return ctx.reply(ctx.message.text);
});
//
// Запуск бота
bot.launch();
