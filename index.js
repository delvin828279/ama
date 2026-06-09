const express = require('express');
const app = express();
const port = process.env.PORT || 80;

app.get('/', (req, res) => {
    res.send('<h1>اتصال مستقیم روی پورت ۸۰ برقرار شد! 🚀</h1>');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});