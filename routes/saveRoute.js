import { Router } from "express";
import admin from "firebase-admin";
import { Routes } from "../firebase.js";
import { User } from "../firebase.js";

// Save new routes
const router = Router();

// Add new route to Route collection
const addToRoute = async (username, timestamp, routeGeometry, distance, duration, likes) => {
  await Routes.add({
    Username: username,
    Timestamp: timestamp,
    Geometry: routeGeometry,
    Distance: distance,
    Duration: duration,
    Likes: likes
  });
}

// Obtain all routes from the specified user
const addToUser = async (username, routeIdArray) => {
  const routes = await Routes.where('Username', '==', `${username}`).get();
  routes.forEach((route) => {
    const routeId = route.id;
    routeIdArray.push(routeId)
  })
  await User.doc(username).update({ Routes: routeIdArray })
}


router.post("/", async (req, res) => {
  const { username, routeGeometry, distance, duration, likes } = req.body;
  const timestamp = admin.firestore.FieldValue.serverTimestamp();
  let routeIdArray = [];

  // TODO: Use Promise.all to throw an error if any of the async tasks fail
  try {
    await addToRoute(username, timestamp, routeGeometry, distance, duration, likes);
  } catch (error) {
    res.status(400).send("Unable to save route")
  }

  try {
    await addToUser(username, routeIdArray);
    res.status(200).send("Route Successfully saved");
  } catch (error) {
    res.status(400).send("Unable to save route")
  }
});


export default router;




