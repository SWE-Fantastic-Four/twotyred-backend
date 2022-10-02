import { Router } from "express";
import admin from "firebase-admin";
import { Routes } from "../firebase.js";
import { User } from "../firebase.js";

// Save new routes
const router = Router();

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

// TODO: Fix to add routeId instead of routeGeometry
const addToUser = async (username, routeGeometry) => {
  const user = await User.doc(username).get();
  if (user.exists) {
    const userData = user.data();
    const routes = userData.Routes;
    routes.push(routeGeometry);
    await User.doc(username).update({ Routes: routes })
  }
  else {
    throw new Error("Unable to add to User");
  }
}


router.post("/", async (req, res) => {
  const { username, routeGeometry, distance, duration, likes } = req.body;
  const timestamp = admin.firestore.FieldValue.serverTimestamp();
  try {
    await addToRoute(username, timestamp, routeGeometry, distance, duration, likes);
    await addToUser(username, routeGeometry);
    res.status(200).send("Route Successfully saved");
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Unable to save route")
  }
});

// TODO: Need to delete inserted data if any async function fails

export default router;




