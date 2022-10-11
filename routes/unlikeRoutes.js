import { Router } from "express";
import { FieldValue } from "firebase-admin/firestore";
import { Routes, Users } from "../firebase.js";

const router = Router();

function fsArrayInclude(fsArray, searchItem) {

  for (let i = 0; i < fsArray.length; i++) {
    if (fsArray[i] === searchItem) {
      return true;
    }
  }
  return false;
}

// Decrease the like count by one for unlikeRoutes function
const decrementLikes = async (routeId) => {
  let count;
  const likeCount = await Routes.doc(routeId).get();
  if (!likeCount.exists) {
    throw new Error("Unable to find route!");
  } else {
    count = likeCount.data().Likes;
    count = count - 1;
    return count;
  }
};

const obtainLikes = async (username) => {
  const user = await Users.doc(username).get()
  if (!user.exists) {
    throw new Error("User does not exist");
  } else {
    return user.data().Likes;
  }
}

router.post("/", async (req, res) => {
  const { username, routeId } = req.body;
  let newCount;
  let likeRoutes = [];

  // Returns newCount only if the route is liked, 
  try {
    likeRoutes = await obtainLikes(username);
    if (!fsArrayInclude(likeRoutes, routeId)) {
      throw new Error("Route already not liked");
    } else {
      newCount = await decrementLikes(routeId)
    }
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }

  // Updates Likes on Routes
  try {
    await Routes.doc(routeId).update({
      Likes: newCount,
      LikedUsers: FieldValue.arrayRemove(username)
    });
  } catch (error) {
    res.status(400).send("Like Route unsuccessful");
    return;
  }

  // Updates Likes on Users
  // If fails, undo Likes decrement on Routes
  try {
    likeRoutes = await Users.doc(username).update({ Likes: FieldValue.arrayRemove(routeId) })
    res.status(200).json({ newLikeCount: newCount });
  } catch (error) {
    await Routes.doc(routeId).update({
      Likes: newCount + 1,
      LikedUsers: FieldValue.arrayUnion(username)
    });
    res.status(400).send(error.message);
    return;
  }
});

export default router;
