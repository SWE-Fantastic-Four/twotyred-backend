import { Router } from "express";
import { Routes } from "../firebase.js";

const router = Router();

router.get("/", async (req, res) => {
  let routeInfoArray = [];
  let routes;

  try {
    if (req.query.like === "true") {
      // Returns the 20 most liked routes
      routes = await Routes.orderBy('Likes', 'desc').limit(20).get();
    }
    else {
      // Returns the last 20 routes
      routes = await Routes.orderBy('Timestamp', 'desc').limit(20).get();
    }
  } catch (error) {
    res.status(400).send("Unable to obtain routes");
    return;
  }
  routes.forEach((route) => {
    routeInfoArray.push({ id: route.id, routeInfo: route.data() })
  });

  res.status(200).json({ routeInfoArray: routeInfoArray });

});


export default router;