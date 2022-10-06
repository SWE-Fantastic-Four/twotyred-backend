import { Router } from "express";
import { Routes } from "../firebase.js";

const router = Router();

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

router.post("/", async (req, res) => {
  const { routeId } = req.body;
  let newCount;
  try {
    newCount = await decrementLikes(routeId);
  } catch (error) {
    res.status(400).send("Error in unliking");
    return;
  }
  try {
    await Routes.doc(routeId).update({
      Likes: newCount,
    });
    res.status(200).send("Unliking successful");
  } catch (error) {
    res.status(400).send("Unliking unsuccesful");
  }
});

export default router;
