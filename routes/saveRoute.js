import { Router } from "express";
import admin from "firebase-admin";
import { Routes } from "../firebase.js";

// Save new routes
const router = Router();

const save = async (username, timestamp, routesGeometry, duration, time, likes) => {
  await Routes.add({
    Username: username,
    Timestamp: timestamp,
    Geometry: routesGeometry,
    Distance: duration,
    Duration: time,
    Likes: likes
  });
}


router.post("/", async (req, res) => {
  const { username, routesGeometry, distance, duration, likes } = req.body;
  const timestamp = admin.firestore.FieldValue.serverTimestamp();
  try {
    await save(username, timestamp, routesGeometry, distance, duration, likes);
    res.status(200).send("Route Successfully saved");
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Unable to save route")
  }
});

export default router;



