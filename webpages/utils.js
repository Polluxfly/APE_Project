'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
const url = require('url');
const fs= require('fs');
 
const jsonSource = './data/userInfo.json';
const scheduleJsonSource = './data/schedule.json';

router.get('/userinfo', function(req,res){
    console.log("1");
    const dataBuffer = fs.readFileSync(jsonSource);
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    res.send(dataJSON);
})

router.get('/schedule', function(req,res){
    console.log("1");
    const dataBuffer = fs.readFileSync(scheduleJsonSource);
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    res.send(dataJSON);
})

router.get('/addUser', function(req,res){
    console.log(req.url);
    const parsedUrl = url.parse(req.url, true);
    let userName=parsedUrl.query.name;
    let selectedSkill= parsedUrl.query.skill;
    const dataBuffer = fs.readFileSync(jsonSource);
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    data.push({"UserName":userName, "Skill":selectedSkill})
    const updatedJSON = JSON.stringify(data);
    fs.writeFileSync(jsonSource, updatedJSON);
    console.log("1");
    res.send(updatedJSON);
})

router.get('/updateSchedule', function(req,res){
    console.log(req.url);
    const parsedUrl = url.parse(req.url, true);

    let day = parsedUrl.query.day;
    let position = parsedUrl.query.position;
    let name = parsedUrl.query.name;

    const dataBuffer = fs.readFileSync(scheduleJsonSource);
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    var col = [];
    for (var i = 1; i < data.length; i++) {
        for (var key in data[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
   console.log(col);
    for (let i in data){
        if(data[i].Day == day){
            data[i][col[position]] = name;
        }
        continue;
    };

    const updatedJSON = JSON.stringify(data);
    fs.writeFileSync(scheduleJsonSource, updatedJSON);
    res.send(updatedJSON);
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