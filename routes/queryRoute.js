import { Router } from "express";
import { Routes } from "../firebase.js";

const router = Router();

router.get("/:routeId", async (req, res) => {
  const routeId = req.params.routeId;
  try {
    const route = await Routes.doc(routeId).get()
    if (!route.exists) {
      throw new Error("Route does not exist");
    } else {
      const routedata = route.data()
      res.status(200).send(routedata)
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
