import { Router } from "express";
import admin from "firebase-admin";
import { User } from "../firebase.js";

// Create new user
// TODO: Insert image
const router = Router();

const createUser = async (username, timestamp, routes, favourites, totalTime, totalDistance) => {
  const user = User.doc(username)
  await user.set({
    Routes: routes,
    Favourites: favourites,
    TotalTime: totalTime,
    TotalDistance: totalDistance,
    Timestamp: timestamp
  })
}


router.post("/", async (req, res) => {
  const { username, routes, favourites, totalTime, totalDistance } = req.body;
  const timestamp = admin.firestore.FieldValue.serverTimestamp();
  console.log(timestamp);

  try {
    await createUser(username, timestamp, routes, favourites, totalTime, totalDistance);
    res.status(200).send("User info saved");
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Unable to save user info")
  }
});

export default router;



