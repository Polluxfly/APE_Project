const port = 8080;

const express = require('express');
const http = require('http');
const ip = require("ip");
const path = require('path');

const app = express();
const server = http.createServer(app);
 
app.use('/', express.static(path.join(__dirname,'/webpages/'),
            {extensions:['html']}) );
 
app.get('/login', (req, res) => {
    console.log("hi");
    res.sendFile('./webpages/loginPage.html', { root: __dirname });
        });
 
// start the server
server.listen(port, () => {
    console.log('Server started:', `http://${ip.address()}:${port}` )
});
 
const utilRouter = require('./webpages/utils.js');
app.use('/userInfo',utilRouter)