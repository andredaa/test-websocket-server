


const WebSocket = require('ws');
const PORT = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port: PORT });

// for local test
// const wss = new WebSocket.Server({ port: 8080 })

console.log("Server started")

wss.on('connection', function connection(ws) {
    console.log('Client connected');

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        wss.clients.forEach(function each(client, sender) {
            if (client !== ws)  {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            }
        });
    });

    ws.on('close', () => console.log('Client disconnected'));
});