import { Router } from "express";
import admin from "firebase-admin";
import { User } from "../firebase.js";

// Create new user
const router = Router();

const createUser = async (username, timestamp, routes, favourites, totalTime, totalDistance) => {
  const user = User.doc(username)
  try {
    await user.set({
      Routes: routes,
      Favourites: favourites,
      TotalTime: totalTime,
      TotalDistance: totalDistance,
      Timestamp: timestamp
    })
  } catch (error) {
    throw new Error("Unable to save user info")
  }
}


router.post("/", async (req, res) => {
  const { username, routes, favourites, totalTime, totalDistance } = req.body;
  const timestamp = admin.firestore.FieldValue.serverTimestamp();

  try {
    await createUser(username, timestamp, routes, favourites, totalTime, totalDistance);
    res.status(200).send("User info saved");
  } catch (error) {
    res.status(400).send(error.message)
  }
});

export default router;