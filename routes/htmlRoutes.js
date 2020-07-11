// DEPENDENCY...path pkg to get the correct file path for our html
const path = require("path");

// ROUTING....GET requests; when user visits a page.
module.exports = function(app) {

 // send the user to the notes url
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

 // if no matching route is found default to home
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
};