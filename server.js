const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Escuchar conexiones de usuarios
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    // Escuchar cuando alguien envía un mensaje
    socket.on('mensaje', (data) => {
        // Enviar el mensaje a todos los conectados
        io.emit('mensaje', data);
    });

    // Escuchar cuando alguien se desconecta
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

// Arrancar el servidor
const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});