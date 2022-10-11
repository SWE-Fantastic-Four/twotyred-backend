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

router.post("/", async (req, res) => {

  const userRef = Users.doc(req.body.user);
  const routeRef = Routes.doc(req.body.route);

  try {
    const userSnapshot = await userRef.get();
    const routeSnapshot = await routeRef.get();

    if (!userSnapshot.exists || !routeSnapshot.exists) {
      throw new Error("unsuccessful: invalid user or route");
    }

    const userData = userSnapshot.data();
    const userFav = userData.Favourites;

    if (fsArrayInclude(userFav, req.body.route)) {
      throw new Error("unsuccessful: route already saved by user");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }

  try {
    await userRef.update({ Favourites: FieldValue.arrayUnion(req.body.route) })
  } catch (error) {
    res.status(400).send("unsuccessful: unable to add to favourites");
    return;
  }

  try {
    await routeRef.update({ FavouritedUsers: FieldValue.arrayUnion(req.body.user) })
    res.status(200).send("successful: route added to favourites");
  } catch (error) {
    await userRef.update({ Favourites: FieldValue.arrayRemove(req.body.route) })
    res.status(400).send("unsuccessful: unable to add to favourites");
  }
})

export default router;
