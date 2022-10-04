import { Router } from "express";
import { Routes } from "../firebase.js";

const router = Router();
// create a function to decrease the like count
const decrementLikes = async (routeId) => { 
  const likeCount = await Routes.doc(routeId).get(); // get the field values of the specified route id
  let count; // initialise variable "count"
  if (!likeCount.exists) { // check if the route exists
    throw new Error("Unable to find route!"); // if the route doesn't exist, throw an error (auto returns the function)
  } else {
    count = likeCount.data().Likes; // if the route exists, get the number of likes from the field values
    count = count - 1; // decrease the like count by one for unlikeRoutes function
    return count;
  }
};

router.post("/", async (req, res) => {
  const { routeId } = req.body; // request body is the specified route id
  let newCount; // initialise variable "newCount"
  try {
    newCount = await decrementLikes(routeId); // asynchronous function -> use await and assign the value of the new number of likes to newCount
  } catch (error) {
    res.status(400).send("Error in unliking"); // if there is an error, send a response
    return;
  }
  try {
    await Routes.doc(routeId).update({ // update the number of likes in firestore
      Likes: newCount,
    });
    res.status(200).send("Unliking successful"); // if successful, send a response
  } catch (error) {
    res.status(400).send("Unliking unsuccesful"); // if there is an error, send a response
  }
});

export default router; // remember to export the router