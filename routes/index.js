import { Router } from "express";
import test from "./test.js";
import saveRoute from "./saveRoute.js";
import createUser from "./createUser.js"
import updateUsername from "./updateUsername.js"
import favouriteRoute from "./favouriteRoute.js"
import unfavouriteRoute from "./unfavouriteRoute.js"
import likeRoutes from "./likeRoutes.js"
import unlikeRoutes from "./unlikeRoutes.js"


const router = Router();
router.use("/test", test);
router.use("/routes/save", saveRoute);
router.use("/user/create", createUser); // TODO: change to /user/:username/create
router.use("/user/update/username", updateUsername);
router.use("/routes/:routeId/favourite", favouriteRoute);
router.use("/routes/:routeId/unfavourite", unfavouriteRoute)
router.use("/routes/like", likeRoutes);
router.use("/routes/unlike", unlikeRoutes);


export default router;