import { Router } from "express";
import { FieldValue } from "firebase-admin/firestore";
import { Users, Routes } from "../firebase.js";

// Update Username
const router = Router();

// Checks availability of newUsername
const checkUsername = async (newUsername) => {
  try {
    const user = await Users.doc(newUsername).get()
    if (user.exists) {
      throw new Error("username is already used")
    }
  } catch (error) {
    throw new Error("username is already used")
  }
}

// Obtain user data
const obtainUser = async (username) => {
  const user = await Users.doc(username).get();
  if (user.exists) {
    return user.data()
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

// Change all routeInfo to new Username
const updateRouteInfo = async (userData, oldUsername, newUsername) => {
  try {
    const routes = userData.Routes;
    routes.map(async (r) => {
      await Routes.doc(r).update({ Username: newUsername })
    })
    const favourites = userData.Favourites;
    favourites.map(async (f) => {
      await Routes.doc(f).update({ FavouritedUsers: FieldValue.arrayRemove(oldUsername) })
      await Routes.doc(f).update({ FavouritedUsers: FieldValue.arrayUnion(newUsername) })
    })
    const likes = userData.Likes;
    likes.map(async (l) => {
      await Routes.doc(l).update({ FouritedUsers: FieldValue.arrayRemove(oldUsername) })
      await Routes.doc(l).update({ FavouritedUsers: FieldValue.arrayUnion(newUsername) })
    })
  } catch (error) {
    throw new Error("Unable update RouteInfo")
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

  // Ensures that oldUsername and newUsername cannot be the same
  if (oldUsername === newUsername) {
    res.status(400).send("oldUsername cannot be the same as newUsername")
    return;
  }

  try {
    await checkUsername(newUsername);
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }

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
  } catch (error) {
    await deleteUser(newUsername);
    res.status(400).send(error.message);
    return;
  }

  try {
    await updateRouteInfo(userData, oldUsername, newUsername);
    res.status(200).json({ oldUsername });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
