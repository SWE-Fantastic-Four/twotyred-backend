import { Router } from "express";
import admin from "firebase-admin";
import { Routes } from "../firebase.js";



const router = Router();

const save = async (userName, timestamp, routesGeometry, duration, time, likes) => {
  await Routes.add({
    Username: userName,
    Timestamp: timestamp,
    Geometry: routesGeometry,
    Distance: duration,
    Duration: time,
    Likes: likes
  });
}


router.post("/", async (req, res) => {
  const { userName, routesGeometry, distance, duration, likes } = req.body;
  const timestamp = admin.firestore.FieldValue.serverTimestamp();
  console.log(timestamp);
  // const durationNum = parseFloat(duration);
  // const timeNum = parseInt(time);
  // const likesNum = parseInt(likes);
  try {
    await save(userName, timestamp, routesGeometry, distance, duration, likes);
    res.send("Route Successfully saved");
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Unable to save route")
  }
});

export default router;



