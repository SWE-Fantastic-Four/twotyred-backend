const express = require("express");
const app = express();
const port = 3000;

let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  // health check
  res.send("Health Check");
});

app.listen(port, () => {
  console.log(`App Running on port ${port}.`);
});
