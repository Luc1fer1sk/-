const http = require('http'); 
const p=(16*Math.atan(1/5)-4*Math.atan(1/239)).toFixed(16)
const server = http.createServer((req, res) => { 
res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); 
res.end('<h1>Овчинников Денис Владимирович<br>477<br>${p}</h1>'); 
}); 
const PORT = 3000; 
server.listen(PORT, () => { 
console.log(`Сервер запущен на http://localhost:${PORT}`); 
});