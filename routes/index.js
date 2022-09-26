import { Router } from "express";
import test from "./test.js";
import saveRoute from "./saveRoute.js";


const router = Router();
router.use("/test", test);
router.use("/routes/save", saveRoute);




export default router;
