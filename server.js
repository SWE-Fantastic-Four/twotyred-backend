import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// app.use(bodyParser.urlencoded({
//   extended: true
// }));

app.use(router);



app.listen(port, () => {
  console.log(`App Running on port ${port}.`);
});
