const http = require('http');
const { EventEmitter } = require('events');
class AppServer extends EventEmitter {
    constructor() {
        super(); 

        this.server = http.createServer((req, res) => {
            this.emit('request:received', { url: req.url, method: req.method });

            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Hello from Event-Driven Server!');
        });

        this.on('server:started', (port) => {
            console.log(`🚀 Сервер запущен на порту ${port}`);
        });

        this.on('request:received', (reqInfo) => {
            console.log(`📨 Получен запрос: ${reqInfo.method} ${reqInfo.url}`);
        });

        this.on('server:stopped', () => {
            console.log(`'🛑 Сервер остановлен'`);
        });
    }

    start(port) {
        this.server.listen(port, () => {
            this.emit('server:started', port);
        });
    }

    stop() {
        this.server.close(() => {
            this.emit('server:stopped');
        });
    }
}

const app = new AppServer();
app.start(3000);

setTimeout(() => {
    app.stop();
}, 10000);
