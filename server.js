const express = require('express');


const PORT = 5000;
const HOST = 'localhost';

const app = express();

app.get('/', (req, res) => {
    res.sendFile('index.html',  { root: __dirname });
});



app.listen(PORT, HOST);