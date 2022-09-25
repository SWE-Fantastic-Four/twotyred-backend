import { Router } from "express";
import { Routes } from "../firebase.js"

const router = Router();

const save = async (userName, routesGeometry, distance, time, likes) => {
  await Routes.add({
    Username: userName,
    Geometry: routesGeometry,
    Distance: distance,
    Time: time,
    Likes: likes
  });
}


router.post("/", async (req, res) => {
  const { userName, routesGeometry, distance, time, likes } = req.body;
  const distanceNum = parseFloat(distance);
  const timeNum = parseInt(time);
  const likesNum = parseInt(likes);
  try {
    await save(userName, routesGeometry, distanceNum, timeNum, likesNum);
  } catch (error) {
    if (error) {
      res.send("Unable to save route")
    }

  }
  res.send("Route Successfully saved");
});

export default router;



