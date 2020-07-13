// LOAD DATA...linking routes to data sources which store and retrieve arrays of info 
// const db = require("../db/db.json");
const fs = require("fs");

// ROUTING
module.exports = (app) => {
    // GET...displays info from user writing notes onto page.  this code block returns a JSON form in array of objects.
    // json sends over a type of object (can be an array or any object you want to send, its seen, then strinify'ed)
    app.get("/api/notes", (req, res) => {
        fs.readFile("db/db.json", "utf-8", (err, data) => {
            res.json(JSON.parse(data));
        })
    });

    // POST...saves it to db.json file
    app.post("/api/notes", (req, res) => {
        fs.readFile("db/db.json", "utf-8", (err, data) => {

            // parses a note as a string 
            const noteData = JSON.parse(data);
            const newNote = req.body;

            // ALWAYS...creates a new id that is one greater than the id of the last element in memory
            const lastElement = noteData[noteData.length - 1];
            newNote.id = lastElement.id + 1;

            // pushes/posts a new note to the file to be saved
            noteData.push(newNote);

            // saves the new note as a string on the db.json file
            fs.writeFileSync("db/db.json", JSON.stringify(noteData), "utf8");
            res.json(noteData);
        });
    });

    // DELETE...deletes the note
    app.delete("/api/notes/:id", (req, res) => {
        fs.readFile("db/db.json", "utf-8", (err, data) => {

            const noteData = JSON.parse(data);
            // parses the note as a string, returns sn integer
            const _id = parseInt(req.params.id);

            // the new data after deletion is filtered from the following for loop
            const filteredData = [];

            // this cycles the data by removing the note deleted then reassigning the id numbers by -1 so it doesn't repeat ids (as it would as noteData.length +1)
            for (var i = 0; i < noteData.length; i++) {
                if (_id !== noteData[i].id) {
                    filteredData.push(noteData[i])
                };
            };
            // rewrites the data ids after deletion
            fs.writeFileSync("db/db.json", JSON.stringify(filteredData), "utf8");

            res.send(200);
        });
    });
}