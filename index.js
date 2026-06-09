const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('<h1>تست بدون داکر موفقیت‌آمیز بود! 🚀</h1>');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});