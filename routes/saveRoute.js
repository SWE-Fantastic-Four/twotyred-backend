import { FieldValue } from "@google-cloud/firestore";
import { Router } from "express";
import { Routes, Users } from "../firebase.js";

// Save new routes
const router = Router();

// Add new route to Route collection
// Returns routeId
const addToRoute = async (username, timestamp, routeGeometry, distance, duration, likes) => {
  try {
    const route = await Routes.add({
      Username: username,
      Timestamp: timestamp,
      Geometry: routeGeometry,
      Distance: distance,
      Duration: duration,
      Likes: likes
    });
    return route.id
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
    await Users.doc(username).update({ Routes: routeIdArray })
  } catch (error) {
    throw new Error("Unable to add to User")
  }
}


router.post("/", async (req, res) => {
  const { username, routeGeometry, distance, duration, likes } = req.body;
  const timestamp = FieldValue.serverTimestamp();
  let routeIdArray = [];
  let routeId;

  try {
    routeId = await addToRoute(username, timestamp, routeGeometry, distance, duration, likes);
  } catch (error) {
    res.status(400).send(error.message)
    return;
  }

  try {
    await addToUser(username, routeIdArray);
    res.status(200).json({ routeId: routeId });
  } catch (error) {
    await Routes.doc(routeId).delete()
    res.status(400).send(error.message)
  }
});


export default router;