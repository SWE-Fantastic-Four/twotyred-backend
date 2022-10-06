import { Router } from "express";
import createUser from "./createUser.js";
import queryUser from "./queryUser.js"
import saveRoute from "./saveRoute.js";
import test from "./test.js";
import updateUsername from "./updateUsername.js";
// import planRoute from "./routePlanner.js"
import dashboardRoutes from "./dashboardRoutes.js";
import favouriteRoute from "./favouriteRoute.js";
import likeRoutes from "./likeRoutes.js";
import unfavouriteRoute from "./unfavouriteRoute.js";
import unlikeRoutes from "./unlikeRoutes.js";
import userRoutes from "./userRoutes.js";


const router = Router();
router.use("/test", test);
router.use("/users/create", createUser);
router.use("/users/query", queryUser)
router.use("/users/update/username", updateUsername);
// router.use("/planroute", planRoute);
router.use("/routes/save", saveRoute);
router.use("/routes/favourite", favouriteRoute);
router.use("/routes/unfavourite", unfavouriteRoute)
router.use("/routes/like", likeRoutes);
router.use("/routes/unlike", unlikeRoutes);
router.use("/routes/user", userRoutes);
router.use("/routes/dashboard", dashboardRoutes);


export default router;