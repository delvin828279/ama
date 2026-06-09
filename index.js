const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const token = '8956738972:AAH-mRc16S3kyqpt65QpV0TW9rE0ZQiq8ew'; // ⚠️ توکن رباتت را اینجا کپی کن
const port = process.env.PORT || 8080;

const app = express();

// ۱. تعریف صفحه اصلی سایت
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>سرویس ابری آمورا</title>
        </head>
        <body style="text-align:center; margin-top:20%; font-family:sans-serif; background-color:#f0f9ff;">
            <h1 style="color:#0284c7; font-size: 2.5rem;">سرویس وب با موفقیت بالا آمد! 🚀</h1>
            <p style="color:#64748b; font-size: 1.2rem;">سرور داکر روی پورت ۸۰۸۰ فعال است و ربات تلگرام در لایه بک‌اند کار می‌کند.</p>
        </body>
        </html>
    `);
});

// ۲. ابتدا روشن کردن سرور وب روی پورت آمورا
app.listen(port, () => {
    console.log(`Express server is listening on port ${port}`);
    
    // ۳. حالا ربات تلگرام بعد از بالا آمدن سایت استارت می‌خورد
    try {
        const bot = new TelegramBot(token, { polling: true });
        console.log('Telegram Bot engine started via Polling mode.');

        bot.onText(/\/start/, (msg) => {
            bot.sendMessage(msg.chat.id, 'سلام! من روی سرور آمورا روشن شدم و بدون مشکل کار می‌کنم! ⚙️🤖');
        });

        bot.on('message', (msg) => {
            if (msg.text !== '/start') {
                bot.sendMessage(msg.chat.id, `پیام شما دریافت شد: "${msg.text}"`);
            }
        });
    } catch (error) {
        console.error('Error starting Telegram Bot:', error);
    }
});