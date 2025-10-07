const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
    console.log(`📥 ${req.method} ${req.url}`);
    
    let filePath = './public' + req.url;
    
    if (req.url === '/') {
        filePath = './public/documents/catalogo.html';
    }
    
    // Configurar MIME types para videos
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'text/html';
    
    if (ext === '.mp4') {
        contentType = 'video/mp4';
    } else if (ext === '.js') {
        contentType = 'text/javascript';
    } else if (ext === '.css') {
        contentType = 'text/css';
    } else if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        contentType = `image/${ext.slice(1)}`;
    }
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(`❌ Error: ${err.message}`);
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end(`
                <h1>404 - Archivo no encontrado</h1>
                <p>Ruta solicitada: ${req.url}</p>
                <p>Archivo buscado: ${filePath}</p>
                <hr>
                <h3>Archivos disponibles:</h3>
                <ul>
                    <li><a href="/documents/catalogo.html">Catálogo</a></li>
                    <li><a href="/test-video-local.html">Test Video</a></li>
                    <li><a href="/videos/">Videos</a></li>
                </ul>
            `);
        } else {
            console.log(`✅ Sirviendo: ${filePath}`);
            res.writeHead(200, {'Content-Type': contentType});
            res.end(data);
        }
    });
});

server.listen(port, () => {
    console.log(`🚀 Servidor web funcionando en http://localhost:${port}`);
    console.log(`📁 Carpeta raíz: ${__dirname}/public`);
    console.log(`🎥 Videos: http://localhost:${port}/videos/`);
    console.log(`📄 Catálogo: http://localhost:${port}/documents/catalogo.html`);
    console.log(`🧪 Test: http://localhost:${port}/test-video-local.html`);
    console.log(`⏹️  Presiona Ctrl+C para detener`);
});
