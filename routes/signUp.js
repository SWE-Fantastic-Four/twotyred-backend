import { Router } from "express";
import { initializeApp } from "@firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword
} from '@firebase/auth';
import firebaseConfig from "../firestoreCreds.json" assert {type: 'json'}
const router = Router();


//FIREBASE
const app = initializeApp(firebaseConfig);
const auth = getAuth();


//API endpoints
router.get("/", (req, res)=>{
    console.log("Now in sign up.");
    res.render("signUp", {email: "Email", password: "Password"});
})

router.post("/", (req, res)=>{
    //res.send(`FirstName: ${req.body.firstName}     LastName: ${req.body.lastName}`);
    //const {}
    const {email, password} = req.body;
    createUserWithEmailAndPassword(auth, email, password)
        .then((cred)=>{
            res.render("signUp", {email: "Email", password: "Password", status: "Account Created"});
            //res.render("homePage") //future works
        })
        .catch((err)=>{
            const {code, message} = err
            console.log(code); 
            console.log(message);

            /*  Types of errors 
                -----------------
                code: auth/email-already-in-use 
                message: Firebase: Error (auth/email-already-in-use).

                code: auth/weak-password
                messageFirebase: Password should be at least 6 characters (auth/weak-password).
            */ 
            var status;
            if(code == "auth/email-already-in-use"){
                status = "Email is already in use. Please use another email account."
            } else if (code == "auth/weak-password" ){
                status = "Weak Password! Password should contain at least 6 characters. Please input new password.";
            } else {
                status = "Unknown Error. Please Try Again"
            }
            res.render("signUp", {email: email, password: password, status: status});
           
        })
    
});

export default router;

