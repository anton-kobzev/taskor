const express = require('express');
const app = express();

console.log('[Taskor] Starting server');

app.use(express.static('app/dist'));

app.get('/api/tasks', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify([
        {
            id: 1,
            name: 'Test34',
            description: 'Desc',
            done: 0,
            archive: 0,
            // created_at: ''
        }
    ]));
});

app.listen(3000);
console.log('[Taskor] Server is listening port 3000');