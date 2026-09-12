const fs = require('fs');
const path = require('path');

const LOG_FILE_PATH = path.join(__dirname, 'logs.txt');

function setupLogger(app) {
    const writeLog = (message) => {
        const timestamp = new Date().toISOString(); 
        const logEntry = `[${timestamp}] ${message}\n`;
        
        fs.appendFile(LOG_FILE_PATH, logEntry, (err) => {
            if (err) {
                console.error('Ошибка записи в лог-файл:', err);
            }
        });
    };

    app.on('server:started', (port) => {
        writeLog(`СОБЫТИЕ: server:started | Порт: ${port}`);
    });

    app.on('request:received', (reqInfo) => {
        writeLog(`СОБЫТИЕ: request:received | Метод: ${reqInfo.method}, URL: ${reqInfo.url}`);
    });

    app.on('server:stopped', () => {
        writeLog(`СОБЫТИЕ: server:stopped`);
    });
}

// Экспортируем функцию
module.exports = { setupLogger };
