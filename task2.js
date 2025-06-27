const http = require('http')

const server = http.createServer((req, res) => {
    if(req.method == 'GET' && req.url == '/'){
        res.end('Hello from server')
    }
    if(req.method == 'POST' && req.url == '/echo'){
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Данные получены', receivedData: data }));
          } catch (error) {
            console.error('Ошибка парсинга JSON:', error);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Неверный формат данных' }));
          }
        });
    }
    
  });
  
  server.listen(8000);
