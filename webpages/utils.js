'use strict';
const express = require('express');
const router = express.Router();
const url = require('url');
const fs= require('fs');

//user json file
const jsonSource = './data/userInfo.json';

//This Schedule json is the one Admin edit on it 
const scheduleJsonSource = './data/schedule.json';

//Json file use to clean schedule, readable only
const emptyJsonSource = './data/emptySchedule.json';

//defaultSchedule is the one normal users will see
const publishedScheduleJsonSource = './data/publishedSchedule.json';

//Publish Admin Edited Schedule to users & clean Admin`s Schedule Table after Submission
// & delete all version files
router.get('/publishSchedules', function(req,res){
    const dataBuffer = fs.readFileSync(scheduleJsonSource);
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    const newJsonData = JSON.stringify(data);

    fs.writeFile(publishedScheduleJsonSource, newJsonData, function(err) {
        if(err) 
            throw err;
        console.log("Published done");
    });

    const cleaningDataBuffer = fs.readFileSync(emptyJsonSource);
    const cleaningDataJSON = cleaningDataBuffer.toString();
    const cleaningData = JSON.parse(cleaningDataJSON);
    const cleaningNewJsonData = JSON.stringify(cleaningData);

    fs.writeFile(scheduleJsonSource, cleaningNewJsonData, function(err) {
        if(err) 
            throw err;
        console.log("Cleanning done");
    });

    fs.readdirSync('./data').forEach(file => {
        if(file.startsWith('version_'))
        {
            fs.unlink(`./data/${file}`,function(err){
                if(err) 
                    return console.log(err);
                console.log(`${file} deleted successfully`);
           });  
        }        
     });

    res.send(dataJSON);
})


router.get('/restSchedules', function(req,res){
    const dataBuffer = fs.readFileSync(emptyJsonSource);
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    const newJsonData = JSON.stringify(data);

    fs.writeFile(scheduleJsonSource, newJsonData, function(err) {
        if(err) 
            throw err;
        console.log("done");
    });
})


router.get('/saveSchedules', function(req,res){
    const dataBuffer = fs.readFileSync(scheduleJsonSource);
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    const newJsonData = JSON.stringify(data);

    let fileList = []
    fs.readdirSync('./data').forEach(file => {
        if(file.startsWith('version_'))
            fileList[fileList.length] = file;
      });
    
    if(fileList.length != 0)
    {
        let fileName = fileList[fileList.length - 1]
        let fileIndex = parseInt(fileName.split('.')[0].split('_')[1])
    
        fs.writeFile(`./data/version_${fileIndex + 1}.json`, newJsonData, function(err) {
            if(err) 
                throw err;
            console.log("done");
        });

    }
    else
    {
        fs.writeFile(`./data/version_1.json`, newJsonData, function(err) {
            if(err) 
                throw err;
            console.log("done");
        }); 
    }
        
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

router.get('/versionSchedules', function(req,res){
    let fileList = []
    fs.readdirSync('./data').forEach(file => {
        if(file.startsWith('version_'))
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

//defaultSchedule is the one Admin Published
router.get('/schedule', function(req,res){
    const dataBuffer = fs.readFileSync(publishedScheduleJsonSource);
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