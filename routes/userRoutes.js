import { Router } from "express";
import { Users, Routes } from "../firebase.js";

const router = Router();

// Obtain array of routeIds (All Routes)
const obtainRouteId = async (username) => {
  const user = await Users.doc(username).get();
  if (user.exists) {
    return user.data().Routes;
  }
  else {
    throw new Error("User does not exist");
  }
}

// Obtain array of routeIds (Favourite Routes)
const obtainFavouriteRouteId = async (username) => {
  const user = await Users.doc(username).get();
  if (user.exists) {
    return user.data().Favourites;
  }
  else {
    throw new Error("User does not exist");
  }
}

// Obtain route geometry from routeId
const obtainRouteInfo = async (r) => {
  const route = await Routes.doc(r).get();
  if (route.exists) {
    return route.data();
  }
  else {
    throw new Error("Route does not exist");
  }
}

router.get("/:username", async (req, res) => {
  const username = req.params.username;
  let routeIds, routeInfo;
  let routeInfoArray = [];
  let obtainInfoSuccess = true;

  // Obtain array of routeIds
  try {
    if (req.query.favourite === "true") {
      // Obtain favourite routes
      routeIds = await obtainFavouriteRouteId(username);
    }
    else {
      // Obtain all routes
      routeIds = await obtainRouteId(username);
    }
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }

  // Obtain routeGeometry from routeId
  // Insert routeId and routeGeometry into routeGeometryArray
  if (Array.isArray(routeIds) && routeIds.length) {
    await Promise.all(routeIds.map(async (routeId) => {
      try {
        routeInfo = await obtainRouteInfo(routeId);
        routeInfoArray.push({ id: routeId, routeInfo: routeInfo });
      } catch (error) {
        obtainInfoSuccess = false;
        res.status(400).send(error.message);
        return;
      }
    }))
  }
  else {
    // If there are no routes
    res.status(200).json({ routeInfoArray: [] })
  }

  // Return routeGeometryArray in the response
  if (Array.isArray(routeInfoArray) && routeInfoArray.length && obtainInfoSuccess === true) {
    res.status(200).json({ routeInfoArray: routeInfoArray })
  }
});


export default router;