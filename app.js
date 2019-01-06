const PORT = 3000;
const express = require("express");
const app = express();
const path = require("path");
const http = require("http").Server(app);
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + "/dist")));

app.listen(3000, () => {
  console.log(`server listening on port ${PORT}`);
});
