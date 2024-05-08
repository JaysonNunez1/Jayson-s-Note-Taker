const router = require('express').Router();

const fs = require('fs');

const uuid = require('../helpers/uuid');


router.get('/notes', function(req, res) {
    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      dbData = JSON.parse(data);
      res.send(dbData);
    });
  });

  router.post('/notes', function(req, res) {
    if (!req.body || typeof req.body!== 'object') {
      return res.status(400).send('Invalid request body');
    }
  
    fs.readFile('./db/db.json', (err, data) => {
      if (err) {
        return res.status(500).send('Internal Server Error');
      }
  
      let dbData = JSON.parse(data);
      dbData.push(req.body);
  
      dbData.forEach((note, index) => {
        note.id = uuid();
      });
  
      const stringData = JSON.stringify(dbData);
  
      fs.writeFile('./db/db.json', stringData, (err) => {
        if (err) {
          return res.status(500).send('Internal Server Error');
        }
        res.send('Added');
      });
    });
  });
  
  router.delete('/notes/:id', deleteNote);

  function deleteNote(req, res) {
    const noteId = req.params.id;
    console.log(`Delete note ID: ${noteId}`);
  
    fs.readFile('./db/db.json', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: 'Error reading file' });
        return;
      }
  
      const dbData = JSON.parse(data);
      const index = dbData.findIndex((note) => note.id === noteId);
  
      if (index!== -1) {
        dbData.splice(index, 1);
      }
  
      const stringData = JSON.stringify(dbData);
  
      fs.writeFile('./db/db.json', stringData, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send({ message: 'Error writing file' });
        } else {
          res.status(204).send();
        }
      });
    });
  }
  
  module.exports = router;