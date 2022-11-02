import express from "express";
import router from "./routes/index.js";
import cors from "cors";

/* 
  server.js implements the Application Backend System control class.

  The key public methods are:
  1. createUser(), under ./routes/createUser.js which handles the creation/registration of a new user

  @author chayhuixiang
*/

/* 
  server.js implements the Route Planning System control class.
  The key public methods are:
  1. saveRoute(), under ./routes/saveRoute.js which handles the saving of a route for a user

  @author chayhuixiang
*/

/* 
  server.js implements the Route Factory control class.
  The key public methods are:
  1. getRoute(), under ./routes/routePlanner.js which handles the planning of a route under the "Customise Route" option
  2. geocode(), under ./routes/geocode.js which handles reverse geocoding of coordinates to address

  @author chayhuixiang
*/

/* 
  server.js implements the Environmental Factors Facade control class.
  The key public methods are:
  1. envFactors(), under ./routes/envFactors.js which queries the environmental factors of the current route

  @author chayhuixiang
*/

/* 
  server.js implements the Route Information control class.
  The key public methods are:
  1. updateInfo(), under ./routes/userRoutes.js and ./routes/dashboardRoutes.js which updates the Dashboard and Profile Page boundary classes of the routes to be displayed

  @author chayhuixiang
*/

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`App Running on port ${port}.`);
});
