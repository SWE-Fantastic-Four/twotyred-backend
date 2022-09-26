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
    res.send("Route Successfully saved");
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Unable to save route")
  }
});

export default router;



