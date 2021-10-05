'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
const url = require('url');
const fs= require('fs');
const {response}= require('express');
 
const { promisify } = require('util');
 
const jsonSource = './data/userInfo.json';

router.get('/all', function(req,res){
    const dataBuffer = fs.readFileSync(jsonSource);
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    res.send(dataJSON);
})
module.exports = router ;
