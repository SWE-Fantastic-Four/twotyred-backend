import { Router } from "express";
import { FieldValue } from "firebase-admin/firestore";
import { Routes, Users } from "../firebase.js";

// Save new routes
const router = Router();

// Add new route to Route collection
// Returns routeId
const addToRoute = async (username, timestamp, routeGeometry, distance, duration, likes, startPt, intermediatePts, endPt) => {
  try {
    const route = await Routes.add({
      Username: username,
      Timestamp: timestamp,
      Geometry: routeGeometry,
      Distance: distance,
      Duration: duration,
      Likes: likes,
      LikedUsers: [],
      FavouritedUsers: [],
      StartPt: startPt,
      IntermediatePts: intermediatePts,
      EndPt: endPt
    });
    return route.id
  } catch (error) {
    throw new Error("Unable to add to Route")
  }
}

// Obtain all routes from the specified user, and add to User
const addToUser = async (username, routeId, distance, duration) => {
  try {
    await Users.doc(username).update({
      Routes: FieldValue.arrayUnion(routeId),
      TotalDistance: FieldValue.increment(distance),
      TotalTime: FieldValue.increment(duration)
    })
  }
  catch (error) {
    throw new Error("Unable to add to User")
  }
}


router.post("/", async (req, res) => {
  const { username, routeGeometry, distance, duration, likes, startPt, intermediatePts, endPt } = req.body;
  const timestamp = FieldValue.serverTimestamp();
  let routeId;

  try {
    routeId = await addToRoute(username, timestamp, routeGeometry, distance, duration, likes, startPt, intermediatePts, endPt);
  } catch (error) {
    res.status(400).send(error.message)
    return;
  }

  try {
    await addToUser(username, routeId, distance, duration);
    res.status(200).json({ routeId: routeId });
  } catch (error) {
    await Routes.doc(routeId).delete()
    res.status(400).send(error.message)
  }
});


export default router;
