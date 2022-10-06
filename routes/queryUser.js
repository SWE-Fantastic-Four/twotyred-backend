import { Router } from "express";
import { Users } from "../firebase.js";

const router = Router();

router.get("/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const user = await Users.doc(username).get()
    if (!user.exists) {
      throw new Error("User does not exist");
    } else {
      const userdata = user.data()
      res.status(200).send(userdata)
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
