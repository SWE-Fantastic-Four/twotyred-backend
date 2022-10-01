import { Router } from "express";
import { Routes } from "../firebase.js";

const router = Router();

router.get("/", async (req, res) => {
  let routeGeometryArray = [];
  let routes;

  try {
    // Returns the last 20 routes
    routes = await Routes.orderBy('Timestamp', 'desc').limit(20).get();
  } catch (error) {
    res.status(400).send("Unable to obtain routes");
    throw new Error("Unable to obtain routes")
  }
  routes.forEach((route) => {
    routeGeometryArray.push({ id: route.id, routeGeometry: route.data().Geometry })
    // console.log({ id: route.id, Geometry: route.data().Geometry});
  });
  // console.log(routeGeometryArray);

  res.status(200).json({ routeGeometryArray: routeGeometryArray });

});


export default router;