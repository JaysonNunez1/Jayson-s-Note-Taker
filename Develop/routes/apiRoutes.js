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

router.delete('/notes/:id', function(req,res) {
    const deleteNote = req.params.id;
    console.log(`Delete note ID: ${deleteNote}`);
    fs.readFile('./db/db.json', (err,data) => {
        if (err) throw err;
        dbData = JSON.parse(data);
        for (let i = 0; i < dbData.length; i++) {
            if (dbData[i].id === deleteNote) {
                dbData.splice([i], 1);
                stringData = JSON.stringify(dbData);
                fs.writeFile('./db/db.json', stringData, (err) => {
                    if (err) throw err;
                });
            }};
            res.status(204).send();
        });
});

module.exports = router;