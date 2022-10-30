import { Router } from "express";
import createUser from "./createUser.js";
import dashboardRoutes from "./dashboardRoutes.js";
import favouriteRoute from "./favouriteRoute.js";
import geocode from "./geocode.js";
import likeRoutes from "./likeRoutes.js";
import queryRoute from "./queryRoute.js";
import queryUser from "./queryUser.js";
import planRoute from "./routePlanner.js";
import saveRoute from "./saveRoute.js";
import health from "./health.js";
import unfavouriteRoute from "./unfavouriteRoute.js";
import unlikeRoutes from "./unlikeRoutes.js";
import updateUsername from "./updateUsername.js";
import updatePhoto from "./updatePhoto.js";
import userRoutes from "./userRoutes.js";
import envFactors from "./envFactors.js"

const router = Router();
router.use("/", health);
router.use("/users/create", createUser);
router.use("/users/query", queryUser)
router.use("/users/update/username", updateUsername);
router.use("/users/update/photo", updatePhoto);
router.use("/planroute", planRoute);
router.use("/routes/query", queryRoute);
router.use("/routes/save", saveRoute);
router.use("/routes/favourite", favouriteRoute);
router.use("/routes/unfavourite", unfavouriteRoute)
router.use("/routes/like", likeRoutes);
router.use("/routes/unlike", unlikeRoutes);
router.use("/routes/user", userRoutes);
router.use("/routes/dashboard", dashboardRoutes);
router.use("/geocode", geocode);
router.use("/envfactors", envFactors);

export default router;
