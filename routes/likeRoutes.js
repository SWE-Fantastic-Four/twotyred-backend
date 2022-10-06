import { Router } from "express";
import { Routes, Users } from "../firebase.js";

const router = Router();

const incrementLike = async (routeId) => {
  let count;
  const likeCount = await Routes.doc(routeId).get();
  if (!likeCount.exists) {
    throw new Error("Unable to find route");
  } else {
    count = likeCount.data().Likes;
    count = count + 1;
    return count;
  }
};

const decrementLikes = async (routeId) => {
  const likeCount = await Routes.doc(routeId).get();
  let count;
  if (!likeCount.exists) {
    throw new Error("Unable to find route!");
  } else {
    count = likeCount.data().Likes;
    count = count - 1; // decrease the like count by one for unlikeRoutes function
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

  try {
    newCount = await incrementLike(routeId);
  }
  catch (error) {
    res.status(400).send("Like Route unsuccessful");
    return;
  }

  try {
    await Routes.doc(routeId).update({
      Likes: newCount,
    });
  } catch (error) {
    res.status(400).send("Like Route unsuccessful");
    return;
  }

  try {
    likeRoutes = await obtainLikes(username);
  } catch (err) {
    res.status(400).send(err.message);
    return;
  }

  try {
    likeRoutes.push(routeId);
    await Users.doc(username).update({
      Likes: likeRoutes,
    });
    res.status(200).send("Like route successful")
  } catch (err) {
    await Routes.doc(routeId).update({
      Likes: newCount - 1,
    });
    res.status(400).send(err.message);
  }
});

export default router;
