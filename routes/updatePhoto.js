import { Router } from "express";
import { Users } from "../firebase.js";

const router = Router();

router.post("/", async (req, res) => {
  const { username, photoUrl } = req.body;
  try {
    const userRef = Users.doc(username);
    await userRef.update({ PhotoURL: photoUrl });
    res.status(200).send("successful: photoUrl updated");
  } catch (error) {
    res.status(400).send("unsuccessful: unable to update photoUrl");
  }
});

export default router;
