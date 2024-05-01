const router = require('express').Router();

const fs = require('fs');

const uuid = require('../helpers/uuid');

router.get('/notes', function(req,res){
    fs.readFile('./db/db.json', (err,data) =>{
        if (err) throw err;
        dbData = JSON.parse(data);
        res.send(dbData);
    });
});

router.post ('/notes', function (req,res){
    const userNotes = req.body;
    fs.readFile('./db/db.json', (err,data) =>{
        if (err) throw err;
        dbData = JSON.parse(data);
        dbData.forEach((note, index) =>{
            note.id = uuid();
            return dbData;
        });
        console.log(dbData);

        stringData = JSON.stringify(dbData);
        fs.writeFile('./db/db.json', stringData, (err) =>{
            if (err) throw err;
        });
    });
    res.send('Added');
});