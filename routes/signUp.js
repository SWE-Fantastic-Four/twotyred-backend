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
    res.render("signUp", {firstName: "FirstName", lastName: "LastName"});
})

router.post("/", (req, res)=>{
    //res.send(`FirstName: ${req.body.firstName}     LastName: ${req.body.lastName}`);
    //const {}
    const {email, password} = req.body;
    createUserWithEmailAndPassword(auth, email, password)
        .then((cred)=>{
            console.log(cred.user);
        })
        .catch((err)=>{
            res.send(err.message);
        })
    
});

export default router;

