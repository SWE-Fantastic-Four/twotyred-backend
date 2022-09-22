import { Router } from "express";
import test from "./test.js"
import signInRouter from "./signIn.js"
import signUpRouter from "./signUp.js"

const router = Router();
router.use("/test", test);

router.use("/signin", signInRouter);
router.use("/signup", signUpRouter);

export default router;
