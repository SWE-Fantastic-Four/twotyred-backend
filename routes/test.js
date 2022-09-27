import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  // health check
  res.send("Health Check");
});

export default router;