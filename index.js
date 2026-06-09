const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const token = '8956738972:AAH-mRc16S3kyqpt65QpV0TW9rE0ZQiq8ew'; // ⚠️ توکن رباتت را اینجا کپی کن
const url = 'https://amvera-delvin8282-run-test.amvera.io'; // آدرس دامین آمورای شما
const port = process.env.PORT || 8080;

// راه‌اندازی سرور وب برای آمورا
const app = express();
app.use(express.json());

// صفحه اصلی سایت شما (برای تست در مرورگر)
app.get('/', (req, res) => {
    res.send(`
        <div style="text-align:center; margin-top:20%; font-family:sans-serif;">
            <h1 style="color:#0088cc;">ربات تلگرام با موفقیت بالا آمد! 🚀</h1>
            <p>سرویس آمورا کاملاً سالم و در حال کار است.</p>
        </div>
    `);
});

// ساخت ربات تلگرام در حالت Webhook
const bot = new TelegramBot(token);
bot.setWebHook(`${url}/bot${token}`);

// مسیر دریافت پیام‌ها از سمت سرورهای تلگرام
app.post(`/bot${token}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// منطق ربات: وقتی کاربر دستور /start یا هر پیامی فرستاد
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'سلام! من روی سرور ابری آمورا (مسکو) به صورت ۲۴ ساعته زنده هستم. ⚙️🔥');
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (msg.text !== '/start') {
        bot.sendMessage(chatId, `شما گفتی: "${msg.text}" | این پیام توسط سرور لینوکس آمورا پردازش شد! ✅`);
    }
});

// روشن شدن سرور روی پورت آمورا
app.listen(port, () => {
    console.log(`Express server is listening on port ${port}`);
});