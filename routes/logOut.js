import { Router } from "express";
import { initializeApp } from "@firebase/app";
import {
    getAuth,
    signOut
} from '@firebase/auth';
import firebaseConfig from "../firestoreCreds.json" assert {type: 'json'}


const router = Router();

//FIREBASE
const app = initializeApp(firebaseConfig);
const auth = getAuth();

router.post("/", (req, res)=>{
    signOut(auth)
        .then(() => {
            res.render("signin", {email:"Email", password:"Password", status:"Successfully Logged Out"})
        }).catch((error) => {
            res.render('logout', {status: "Logout Unsuccessful."})
    });
   
})
export default router;

