const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const UUID = '9001a117-0aa7-4028-971c-e3620df969ee'; // شناسه شما

// ساخت سرور برای لود کردن صفحه وب
const server = http.createServer((req, res) => {
    // خواندن و نمایش فایل HTML
    fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error loading page');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        }
    });
});

// راه‌اندازی بخش وب‌ساکت تانل
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('اتصال جدید برقرار شد');
    
    ws.on('message', (message) => {
        // داده‌های شبکه در این قسمت تانل می‌شوند
    });

    ws.on('close', () => console.log('اتصال قطع شد'));
    ws.on('error', (err) => console.error('خطای وب‌ساکت:', err));
});

server.listen(PORT, () => {
    console.log(`سرور روی پورت ${PORT} روشن است.`);
});