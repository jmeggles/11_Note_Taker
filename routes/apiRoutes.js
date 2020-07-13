// LOAD DATA...linking routes to data sources which store and retrieve arrays of info 
const db = require("../db/db.json");
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
    app.post("/api/notes:id", (req, res) => {
        noteData.push(req.body);
        fs.writeFileSync("db/db.json", JSON.stringify(noteData), "utf8");
        res.json(true);
    });

    // GETS...saved note 
    app.get("/api/notes", (req, res) => {
        res.json(notes[req.params.id]);
    });

    // DELETE...deletes the note
    app.delete("/api/notes:id", (req, res) => {
 
        const uniqueId = req.params.id;
            let note = noteData.filter(note => {
                return note.id === requestID;
            })[0];

            const index = noteData.indexOf(note);

            noteData.splice(index, 1);

            fs.writeFileSync('db/db.json', JSON.stringify(noteData), 'utf8');
            res.json("Deleted!!");
    });

    //when a note is added or deleted, this updates the json file 
    // function updateDb() {
    //     fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
    //         if (err) throw err;
    //         return true;
    //     });
    // }
}

//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.