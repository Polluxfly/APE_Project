'use strict';
const express = require('express');
const router = express.Router();
const url = require('url');
const fs= require('fs');

const jsonSource = './data/userInfo.json';
const scheduleJsonSource = './data/schedule.json';
const defaultScheduleJsonSource = './data/defaultSchedule.json';

router.get('/saveSchedules', function(req,res){
    const dataBuffer = fs.readFileSync(scheduleJsonSource);
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    const newJsonData = JSON.stringify(data);

    fs.writeFile('./data/version_1.json', newJsonData, function(err) {
        if(err) 
            throw err;
        console.log("done");
    });

    res.send(dataJSON);
})

router.get('/pastSchedules', function(req,res){
    let fileList = []
    fs.readdirSync('./data').forEach(file => {
        if(file.startsWith('week_'))
            fileList[fileList.length] = file;
      });
    
    res.send(fileList)
})

router.get('/userinfo', function(req,res){
    const dataBuffer = fs.readFileSync(jsonSource);
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    res.send(dataJSON);
})


router.get('/schedule', function(req,res){
    const dataBuffer = fs.readFileSync(scheduleJsonSource);
    const dataJSON = dataBuffer.toString();
    res.send(dataJSON);
})

router.get('/parseSchedule', function(req,res){
    const parsedUrl = url.parse(req.url, true);
    let fileName=parsedUrl.query.fileName;
    let targetFile = scheduleJsonSource
    console.log(fileName)
    if(fileName!=undefined || fileName!="")
    {
        targetFile = `./data/${fileName}`
    }
    else
    {
        targetFile = scheduleJsonSource
    }
    const dataBuffer = fs.readFileSync(targetFile);
    const dataJSON = dataBuffer.toString();
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
module.exports = router ;