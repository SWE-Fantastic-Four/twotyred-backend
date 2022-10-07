import { FieldValue } from "firebase-admin/firestore"
import { Router } from "express";
import { Users } from "../firebase.js";

// Create new user
const router = Router();

const createUser = async (username, timestamp, routes, favourites, likes, totalTime, totalDistance) => {
  const user = Users.doc(username);
  try {
    await user.set({
      Routes: routes,
      Favourites: favourites,
      Likes: likes,
      TotalTime: totalTime,
      TotalDistance: totalDistance,
      Timestamp: timestamp
    })
  } catch (error) {
    throw new Error("Unable to save user info")
  }
}


router.post("/", async (req, res) => {
  const { username, routes, favourites, likes, totalTime, totalDistance } = req.body;
  const timestamp = FieldValue.serverTimestamp();

  try {
    await createUser(username, timestamp, routes, favourites, likes, totalTime, totalDistance);
    res.status(200).send("User info saved");
  } catch (error) {
    res.status(400).send(error.message)
  }
});

export default router;
