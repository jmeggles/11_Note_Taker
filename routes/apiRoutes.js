// LOAD DATA...linking routes to data sources which hold arrays of info 
const db = require("../db/db.json");
const fs = require("fs");

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// displays info from user writing notes onto page.  this code block returns a JSON form in array of objects.
// json sends over a type of object (can be an array or any object you want to send, its seen then strinify'ed)
app.get("/api/notes", function(req, res) {
    return res.json(notes);
});


app.get("*", function(req, res) {
    res.sendFile(path.join(mainDir, "index.html"));
})


app.post("/api/notes", function(req, res) {
    res.json(db);
});

