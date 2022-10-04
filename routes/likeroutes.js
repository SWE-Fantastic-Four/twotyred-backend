import { Router } from "express";
import { Routes } from "../firebase.js";

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
router.post("/", async (req, res) => {
  const { routeId } = req.body;
  let newCount;
  try {
    newCount = await incrementLike(routeId);
  }
  catch (error) {
    res.status(400).send("Error in liking");
    return;
  }
  try {
    await Routes.doc(routeId).update({
      Likes: newCount,
    });
    res.status(200).send("Liking successful");
  } catch (error) {
    res.status(400).send("Liking unsuccessful");
  }
});

export default router;
