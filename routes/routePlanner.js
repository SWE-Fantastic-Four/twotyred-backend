import onemapCreds from "../onemap-config/onemapCred.json" assert {type:"json"}
import fetch from 'node-fetch';
import polyUtil from 'polyline-encoded';
import {Router} from "express"



async function getOneMapAuth(){
    const options ={
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(onemapCreds),
    }

    try {
        const fetchResponse = await fetch(`https://developers.onemap.sg/privateapi/auth/post/getToken`, options);
        const resJSON = await fetchResponse.json()
        const access_token = resJSON['access_token'];
        return access_token;
    } catch (err){
        console.log(err);
    }
}

async function oneMapRouting(start, end){

    const routeType =  "walk";
    const token =  await getOneMapAuth()

    const fetchResponse = await fetch(`https://developers.onemap.sg//privateapi/routingsvc/route?start=${start}&end=${end}&routeType=${routeType}&token=${token}`);
    const resJSON = await fetchResponse.json();
    const routeGeom = resJSON['route_geometry'];
    
    var encoded = String(routeGeom);

    if (encoded !== undefined || encoded !== '' || encoded != null ) {
        var latlngs = polyUtil.decode(encoded, {
            precision: 6
        });
    };   
    return latlngs;
} 
    


const router = Router();
router.post("/", async (req, res) => {
    
    try {
        //var chosenLocations = ["1.3569,103.9436","1.3522,103.9625", "1.3457,103.9471" ]` //for testing
        const chosenLocations = req.body.chosenLocations;
    
        var result = [];
        for (var i = 0; i < chosenLocations.length - 1; i++){
            var coords = await oneMapRouting(chosenLocations[i], chosenLocations[i+1]);
            console.log(coords);
            result.push(...coords);
        }
        var combinedEncode = polyUtil.encode(result,6);
        console.log(combinedEncode);
        res.status(200).send({route_geometry: combinedEncode})
    }
    catch(err){
        console.log(err.message);
        res.status(400).send(err.message);
    }
})

export default router;