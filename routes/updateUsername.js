import { Router } from "express";
import { Users } from "../firebase.js";

// Update Username
const router = Router();

// Obtain user data
const obtainUser = async (username) => {
  const user = await Users.doc(username).get();
  if (user.exists) {
    return (user.data())
  }
  else {
    throw new Error("Unable to obtain user data")
  }
}

// Create new User
const createNewUser = async (newUsername, userData) => {
  const user = Users.doc(newUsername);
  try {
    await user.set(userData);
  } catch (error) {
    throw new Error("Unable to create new User")
  }
}

// Delete User
const deleteUser = async (username) => {
  try {
    await Users.doc(username).delete();
  } catch (error) {
    throw new Error("Unable to delete user")
  }
}

router.post("/", async (req, res) => {
  const { oldUsername, newUsername } = req.body;
  let userData;
  
  try {
    userData = await obtainUser(oldUsername);
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }

  try {
    await createNewUser(newUsername, userData);
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }

  try {
    await deleteUser(oldUsername);
    res.status(200).json({ oldUsername: oldUsername });
  } catch (error) {
    await deleteUser(newUsername);
    res.status(400).send(error.message);
    return;
  }
});

export default router;