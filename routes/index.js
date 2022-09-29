import { Router } from "express";
import test from "./test.js";
import createUser from "./createUser.js"
import updateUsername from "./updateUsername.js"
import saveRoute from "./saveRoute.js";
import planRoute from "./routePlanner.js"
import favouriteRoute from "./favouriteRoute.js"
import unfavouriteRoute from "./unfavouriteRoute.js"
import likeRoutes from "./likeRoutes.js"
import unlikeRoutes from "./unlikeRoutes.js"
import userRoutes from "./userRoutes.js"


const router = Router();
router.use("/test", test);
router.use("/routes/save", saveRoute);
router.use("/user/create", createUser);
router.use("/user/update/username", updateUsername);
router.use("/planroute", planRoute);
router.use("/routes/save", saveRoute);
router.use("/routes/:routeId/favourite", favouriteRoute);
router.use("/routes/:routeId/unfavourite", unfavouriteRoute)
router.use("/routes/like", likeRoutes);
router.use("/routes/unlike", unlikeRoutes);
router.use("/routes/user", userRoutes);


export default router;