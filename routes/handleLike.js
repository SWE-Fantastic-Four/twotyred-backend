import {Router} from "express";
import { Routes, User } from "../firebase.js";


const router = Router()

router.post("/like", async (req, res)=>{
    const reqBod = req.body;

    const userRef = User.doc(reqBod.user);
    const routeRef = Routes.doc(reqBod.route);

    try{
        const userSnapshot = await userRef.get();
        const routeSnapshot = await routeRef.get();
        
        if(!userSnapshot.exists || !routeSnapshot.exists){
            throw new Error("invalid user or route");
        } 
        else {
            const routeData = routeSnapshot.data();
            const currentLikes = routeData.Likes;
           
            var updateRouteRes = ""

            if(currentLikes != null) {
                const newLikes = currentLikes + 1
                updateRouteRes = await routeRef.update({Likes: newLikes}); 
            } 
            else { 
                updateRouteRes = await routeRef.update({Likes: 1});
            }
            res.status(200).send(updateRouteRes);
        }
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }
})


router.post("/unlike", async (req, res)=>{
    const reqBod = req.body;

    const userRef = User.doc(reqBod.user);
    const routeRef = Routes.doc(reqBod.route);

    try{

        const userSnapshot = await userRef.get();
        const routeSnapshot = await routeRef.get();

        if(!userSnapshot.exists || !routeSnapshot.exists){
            throw new Error("Route or User is incorrect");
        } 
        else {
            const currentLikes = routeSnapshot.Likes;
            if (currentLikes > 0){
                const updateRes = await routeRef.update({Likes: (currentLikes-1)});
                res.status(200).send(updateRes);
            }
            else {
                res.status(200).send("Likes count already at 0.");
            }
        }
    }
    catch(err){
        res.status(400).send(err);
    }
})

export default router;