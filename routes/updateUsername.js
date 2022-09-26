import { Router } from "express";
import admin from "firebase-admin";
import { User } from "../firebase.js";

// Update Username
const router = Router();

const obtainUser = async (username) => {
  const user = await User.doc(username).get();
  if (user.exists) {
    return (user.data())
  }
  else {
    console.log("Unable to obtain user data")
  }
}

const createNewUser = async (newUsername, userData) => {
  const user = User.doc(newUsername);
  await user.set(userData);
}

const deleteOldUser = async (oldUsername) => {
  await User.doc(oldUsername).delete();
}

router.post("/", async (req, res) => {
  const { oldUsername, newUsername } = req.body;
  const userData = await obtainUser(oldUsername);
  // console.log(userData)

  try {
    await createNewUser(newUsername, userData);
    await deleteOldUser(oldUsername);
    res.status(200).send("Username updated");
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Unable to update username")
  }
});

export default router;



