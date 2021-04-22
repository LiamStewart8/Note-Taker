var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();
var PORT = 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const newData = JSON.parse(data);
        res.json(newData);
    })
})

app.post("/api/notes", function (req, res){
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const newData = JSON.parse(data);
        const newNote = req.body;
        newData.push(newNote);
    
    fs.writeFile('./db/db.json', JSON.stringify(newData) ,(err) => {
        if (err) throw err;
        res.json(newData);
    });
    

    
});
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});