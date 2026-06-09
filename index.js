const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('<h1>تست موفقیت‌آمیز بود! صفحه اصلی بدون مشکل بالا آمد. 🚀</h1>');
});

app.listen(port, () => {
    console.log(`Test server is running on port ${port}`);
});