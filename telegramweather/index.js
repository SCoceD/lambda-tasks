import express from "express";
import WeatherApi from "./weather/WeatherApi.js";
import {Telegraf} from "telegraf";
import ExchangeRate from "./weather/ExchangeRate.js";
const BOT_TOKEN = '5434738654:AAFzpAsT6dGonyFOkxnYTqrrynedJ24-0BY';
const PORT = process.env.PORT || 5000

express()
    .listen(PORT, () => console.log(`Listening on ${PORT}`))


//
const bot = new Telegraf(BOT_TOKEN);
//
bot.start((ctx) => {
        ctx.reply(`Hello, ${
            ctx.from.first_name ? ctx.from.first_name : "gud guy"
        }! tap /help and you see, what i can.`, {
            reply_markup: {
                inline_keyboard: [
                    /* Inline buttons. 2 side-by-side */
                    [{text: "Weather in Milwaukee", callback_data: "run"}],
                    [{text: "Exchange Rate USD", callback_data: "usd"}
                        , {text: "Exchange Rate EUR", callback_data: "eur"}]
                ]
            }
        })
    }
);

bot.action("usd", async (ctx) => {
    const exchangeRate = new ExchangeRate();
    const result = await exchangeRate.getUSDExchangeRate();
    ctx.reply(result);
});

bot.action("eur", async (ctx) => {
    const exchangeRate = new ExchangeRate();
    const result = await exchangeRate.getEURExchangeRate();
    ctx.reply(result);
});

bot.action("run", (ctx) => {
    ctx.reply(`Приветствую, ${
        ctx.from.first_name ? ctx.from.first_name : "хороший человек"
    }! Набери /help и увидишь, что я могу.`, {
        reply_markup: {
            inline_keyboard: [
                /* Inline buttons. 2 side-by-side */
                [{text: "With an interval of 3 hours", callback_data: "3"}
                    , {text: "With an interval of 6 hours", callback_data: "6"}]
            ]
        }
    })
})
bot.action("3", async (ctx) => {
    const weatherApi = new WeatherApi('43.03', '87.57');
    const result = await weatherApi.get3HoursWeather();
    return ctx.reply(result);
})
bot.action("6", async (ctx) => {
    const weatherApi = new WeatherApi('43.03', '87.57');
    const result = await weatherApi.get6HoursWeather();
    return ctx.reply(result);
})
//
// Обработчик команды /help
bot.help((ctx) => ctx.reply("get a f@k out"));
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
    return ctx.reply(ctx.message.text + ' ' + ctx.chat.id);
});
//
// Запуск бота
bot.launch();
