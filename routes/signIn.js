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
            /*
            ------------
            error codes
            ------------
            auth/invalid-email
                Thrown if the email address is not valid.
            auth/user-disabled
                Thrown if the user corresponding to the given email has been disabled.
            auth/user-not-found
                Thrown if there is no user corresponding to the given email.
            auth/wrong-password
                Thrown if the password is invalid for the given email, or the account corresponding to the email does not have a password set.
            */
            var status;
            switch (code){
                case "auth/invalid-email":
                    status = "Invalid email address entered. Please try again.";                    
                case "auth/user-disabled":
                    status = "Current user has been disabled. Sign in unsuccessful.";
                case "auth/user-not-found":
                    status = "User account not found. Please create an account.";
                case "auth/wrong-password":
                    status = "Incorrect Password! Please try again.";
            }

            res.render("signin", {email: email, password: password, status: status});
        });
})
export default router;