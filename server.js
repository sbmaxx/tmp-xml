const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.HTTP_PORT || 3333;
const xmlPath = path.resolve(process.env.XML_FILE || 'turbo.xml');

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/turbo/api/xml', (req, res) => {
    res.set('Content-Type', 'text/xml');
    fs.createReadStream(xmlPath).pipe(res);
});

app.post('/turbo/api/xml', (req, res) => {
    if (!req.body.xml) {
        return 'empty content';
    }

    fs.writeFile(xmlPath, req.body.xml, () => res.send('ok'))
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
}).on('error', e => console.log(e));