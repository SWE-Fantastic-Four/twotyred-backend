import { Router } from "express";
import { Routes, User } from "../firebase.js";
import { FieldValue } from "@google-cloud/firestore";

const router = Router();

function fsArrayInclude(fsArray, searchItem){
  
    for (let i = 0; i < fsArray.length; i++) {
        if( fsArray[i] === searchItem){
            return true;
        }
      }
    return false;
}

router.post("/add", async (req, res)=>{
    const reqBod = req.body;

    const userRef = User.doc(reqBod.user);
    const routeRef = Routes.doc(reqBod.route); 

    try{
        const userSnapshot = await userRef.get();
        const routeSnapshot = await routeRef.get();
        
        const userData = userSnapshot.data()
        const userFav = userData.Favourites

        if(!userSnapshot.exists || !routeSnapshot.exists){
            throw new Error("invalid user or route");
        } 
        else if(fsArrayInclude(userFav, reqBod.route)) {
            throw new Error("route already saved by user")
        }
        else {
            const updateUserRes = await userRef.update({Favourites: FieldValue.arrayUnion(reqBod.route)})
            res.status(200).send(updateUserRes);
        }
    } catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }


})

router.post("/remove", async (req, res)=>{
    const reqBod = req.body;

    const userRef = User.doc(reqBod.user);
    const routeRef = Routes.doc(reqBod.route);

    try{
        const userSnapshot = await userRef.get();
        const routeSnapshot = await routeRef.get();
        
        const userData = userSnapshot.data()
        const userFav = userData.Favourites

        if(!userSnapshot.exists || !routeSnapshot.exists){
            throw new Error("invalid user or route");
        }
        else if(!fsArrayInclude(userFav, reqBod.route)) {
            throw new Error("route not saved by user")
        }
        else{
            const updateUserRes = await userRef.update({Favourites: FieldValue.arrayRemove(reqBod.route)})
            res.status(200).send(updateUserRes);
        }
    } catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }


})

export default router;