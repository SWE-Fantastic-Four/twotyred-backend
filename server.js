import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.use(router);


app.listen(port, () => {
  console.log(`App Running on port ${port}.`);
});
