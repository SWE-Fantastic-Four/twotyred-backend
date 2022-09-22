import { Router } from "express";
import test from "./test.js";
import signInRouter from "./signIn.js";
import logOutRouter from "./logOut.js"


const router = Router();
router.use("/test", test);
router.use("/signin", signInRouter);
router.use("/logout", logOutRouter)


export default router;