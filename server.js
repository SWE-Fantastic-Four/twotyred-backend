import express from "express"
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

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
