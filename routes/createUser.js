import { FieldValue } from "firebase-admin/firestore"
import { Router } from "express";
import { Users } from "../firebase.js";

// Create new user
const router = Router();

const createUser = async (username, timestamp, routes, favourites, likes, totalTime, totalDistance, photoUrl) => {
  const user = Users.doc(username);
  try {
    await user.set({
      Routes: routes,
      Favourites: favourites,
      Likes: likes,
      TotalTime: totalTime,
      TotalDistance: totalDistance,
      Timestamp: timestamp,
      PhotoURL: photoUrl
    })
  } catch (error) {
    throw new Error("Unable to save user info")
  }
}

// Checks availability of username
const checkUsername = async (username) => {
  try {
    const user = await Users.doc(username).get()
    if (user.exists) {
      throw new Error("username is already used")
    }
  } catch (error) {
    throw new Error("username is already used")
  }
}

router.post("/", async (req, res) => {
  const { username, routes, favourites, likes, totalTime, totalDistance, photoUrl } = req.body;
  const timestamp = FieldValue.serverTimestamp();

  try {
    await checkUsername(username);
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }

  try {
    await createUser(username, timestamp, routes, favourites, likes, totalTime, totalDistance, photoUrl);
    res.status(200).send("User info saved");
  } catch (error) {
    res.status(400).send(error.message)
  }
});

export default router;
