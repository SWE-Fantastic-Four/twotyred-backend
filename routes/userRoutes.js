import { Router } from "express";
import { Users, Routes } from "../firebase.js";

const router = Router();

// Obtain array of routeIds (All Routes)
const obtainRoutes = async (username) => {
  const user = await Users.doc(username).get();
  if (user.exists) {
    return user.data().Routes;
  }
  else {
    throw new Error("User does not exist");
  }
}

// Obtain array of routeIds (Favourite Routes)
const obtainFavouriteRoutes = async (username) => {
  const user = await Users.doc(username).get();
  if (user.exists) {
    return user.data().Favourites;
  }
  else {
    throw new Error("User does not exist");
  }
}

// Obtain route geometry from routeId
const obtainRouteGeometry = async (r) => {
  const route = await Routes.doc(r).get();
  if (route.exists) {
    // console.log(route.data().Geometry)
    return route.data().Geometry;
  }
  else {
    throw new Error("Route does not exist");
  }
}

router.get("/:username", async (req, res) => {
  const username = req.params.username;
  let routes, routeGeometry;
  let routeGeometryArray = [];
  let obtainGeometrySuccess = true;

  // Obtain array of routeIds
  try {
    if (req.query.favourite) {
      // Obtain favourite routes
      routes = await obtainFavouriteRoutes(username);
    }
    else {
      // Obtain all routes
      routes = await obtainRoutes(username);
    }
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }

  // Obtain routeGeometry from routeId
  // Insert routeId and routeGeometry into routeGeometryArray
  if (Array.isArray(routes) && routes.length) {
    await Promise.all(routes.map(async (route) => {
      try {
        routeGeometry = await obtainRouteGeometry(route);
        routeGeometryArray.push({ id: route, routeGeometry: routeGeometry });
      } catch (error) {
        obtainGeometrySuccess = false;
        res.status(400).send(error.message);
        return;
      }
    }))
  }

  // Return routeGeometryArray in the response
  if (Array.isArray(routeGeometryArray) && routeGeometryArray.length && obtainGeometrySuccess === true) {
    res.status(200).json({ routeGeometryArray: routeGeometryArray })
  }
});


export default router;