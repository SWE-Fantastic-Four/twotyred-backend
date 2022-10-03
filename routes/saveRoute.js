import { Router } from "express";
import admin from "firebase-admin";
import { Routes } from "../firebase.js";
import { User } from "../firebase.js";

// Save new routes
const router = Router();

// Add new route to Route collection
const addToRoute = async (username, timestamp, routeGeometry, distance, duration, likes) => {
  try {
    await Routes.add({
      Username: username,
      Timestamp: timestamp,
      Geometry: routeGeometry,
      Distance: distance,
      Duration: duration,
      Likes: likes
    });
  } catch (error) {
    throw new Error("Unable to add to Route")
  }
}

// Obtain all routes from the specified user, and add to User
const addToUser = async (username, routeIdArray) => {
  const routes = await Routes.where('Username', '==', `${username}`).get();
  routes.forEach((route) => {
    const routeId = route.id;
    routeIdArray.push(routeId)
  })
  try {
    await User.doc(username).update({ Routes: routeIdArray })
  } catch (error) {
    throw new Error ("Unable to add to User")
  }
}


router.post("/", async (req, res) => {
  const { username, routeGeometry, distance, duration, likes } = req.body;
  const timestamp = admin.firestore.FieldValue.serverTimestamp();
  let routeIdArray = [];

  // TODO: Use Promise.all to throw an error if any of the async tasks fail
  try {
    await addToRoute(username, timestamp, routeGeometry, distance, duration, likes);
  } catch (error) {
    res.status(400).send(error.message)
    return;
  }

  try {
    await addToUser(username, routeIdArray);
    res.status(200).send("Route Successfully saved");
  } catch (error) {
    res.status(400).send(error.message)
  }
});


export default router;