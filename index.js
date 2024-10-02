const http = require('http');
const fs = require('fs');
const path = require('path');

const appServer = http.createServer((request, response) => {
    switch (request.url) {
        case '/':
            fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
                if (err) {
                    response.writeHead(500, { 'Content-Type': 'application/json' });
                    response.write(JSON.stringify({ "message": "Erro ao ler o arquivo", "requestedPath": request.url }));
                } else {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.write(data);
                }
                response.end();
            });
            break;

        default:
            response.writeHead(404, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify({ "message": "Path não encontrado", "requestedPath": request.url }));
            response.end();
    }
});

appServer.listen(8080, () => {
    console.log('Servidor funcionando na porta 8080');
});
