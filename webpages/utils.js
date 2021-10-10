'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
const url = require('url');
const fs= require('fs');
 
const jsonSource = './data/userInfo.json';
const jsonSource1 = './data/schedule.json';

router.get('/userinfo', function(req,res){
    console.log("1");
    const dataBuffer = fs.readFileSync(jsonSource);
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    res.send(dataJSON);
})

router.get('/schedule', function(req,res){
    console.log("1");
    const dataBuffer = fs.readFileSync(jsonSource1);
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    res.send(dataJSON);
})

// router.get('/main', function(req,res){
//     console.log(req.url);
//     const parsedUrl = url.parse(req.url, true);
//     let org=parsedUrl.query.userName;
//     let amt= parsedUrl.query.amt;
//     const dataBuffer = fs.readFileSync(jsonSource);
//     const dataJSON = dataBuffer.toString();
//     const data = JSON.parse(dataJSON);
//     let newTotal =0;
//     console.log(org);
    
//     for (let i in data){
//         if(data[i].Entity == org){
//             newTotal =  Number(data[i].Amount) + Number(amt);
//             data[i].Amount = newTotal;
//         }
//     };
//     const updatedJSON = JSON.stringify(data);
//     fs.writeFileSync(jsonSource, updatedJSON);
//     console.log(newTotal);
//     res.send(JSON.stringify([{Total:newTotal}]));
// })
module.exports = router ;