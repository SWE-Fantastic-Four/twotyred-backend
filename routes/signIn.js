import { Router } from "express";
import { initializeApp } from "@firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword
} from '@firebase/auth';
import firebaseConfig from "../firestoreCreds.json" assert {type: 'json'}
const router = Router();


//FIREBASE
const app = initializeApp(firebaseConfig);
const auth = getAuth();

router.get("/", (req, res)=>{
    console.log("Now in sign in.");
    res.render("signin", {email: "Email", password: "Password"});
})

router.post("/", (req, res)=>{
    console.log("Posting sign in request...");
    const {email, password} = req.body;

    signInWithEmailAndPassword(auth, email, password)
        .then((creds) => {
            console.log("Signed in");
            console.log(creds)
            res.render('logout', {username: creds.user.email}) //Future work: get email from being logged in and not from api response
        })
        .catch((err) => {
            const {code, message} = err
            console.log(code);
            console.log(message);

            res.render("signin", {email: email, password: password, status: "Incorrect Password! Try again"});
        });
})
export default router;