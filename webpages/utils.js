'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
const url = require('url');
const fs= require('fs');
 
const jsonSource = './data/userInfo.json';
const jsonSource1 = './data/schedule.json';

router.get('/all', function(req,res){
    console.log("1");
    const dataBuffer = fs.readFileSync(jsonSource);
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    res.send(dataJSON);
})

router.get('/whole', function(req,res){
    console.log("1");
    const dataBuffer = fs.readFileSync(jsonSource1);
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    res.send(dataJSON);
})

module.exports = router ;