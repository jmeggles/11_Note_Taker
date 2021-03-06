// DEPENDENCY...npm pkg called express to give server functionality.
const express = require("express");

// CONFIG....tells node that we are creating an express server.
const app = express();

// CONFIG...initial port, will be used in listner.
const PORT = process.env.PORT || 5000;

// CONFIG...sets up the Express app to handle data parsing.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ROUTER...sends the server to route files.
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// LISTENER...starts the server
app.listen(PORT, () => console.log(`I'm rockin' n rollin' on port ": + ${PORT}`));