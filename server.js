const port = 8080;

const express = require('express');
const http = require('http');
const ip = require("ip");
const path = require('path');

const app = express();
const server = http.createServer(app);
console.log(path.join(__dirname,'/webpages/loginPage.html'));

app.use('/', express.static(path.join(__dirname,'/webpages'),
            {extensions:['html']}) );

app.get('/', (req, res) => {
    console.log("hi");
    res.sendFile('./webpages/loginPage.html', { root: __dirname });
        });

app.get('/login', (req, res) => {
    console.log("hi");
    res.sendFile('./webpages/loginPage.html', { root: __dirname });
        });
 
app.get('/main', (req, res) => {
    console.log("hi");
    res.sendFile('./webpages/mainPage.html', { root: __dirname });
        });


// start the server
server.listen(port, () => {
    console.log('Server started:', `http://${ip.address()}:${port}` )
});

app.use('/userInfo', require('./webpages/utils.js'));