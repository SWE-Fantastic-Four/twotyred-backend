import fetch from 'node-fetch';
import polyUtil from 'polyline-encoded';
import { Router } from "express"
import getOneMapAuth from "../scripts/getOneMapAuth.js";

async function oneMapRouting(start, end){

    const routeType =  "cycle";
    const token =  await getOneMapAuth()

    const fetchResponse = await fetch(`https://developers.onemap.sg/privateapi/routingsvc/route?start=${start}&end=${end}&routeType=${routeType}&token=${token}`);
    const resJSON = await fetchResponse.json();
    const routeGeom = resJSON['route_geometry'];
    const routeSummary = resJSON['route_summary'];
    var encoded = String(routeGeom);
    if (encoded !== undefined || encoded !== '' || encoded != null ) {
        var latlngs = polyUtil.decode(encoded, {
            precision: 6
        });
    };   
    return [latlngs, routeSummary];
} 

const router = Router();
router.post("/", async (req, res) => {
    
    try {
        //var chosenLocations = ["1.3569,103.9436","1.3522,103.9625", "1.3457,103.9471" ]` //for testing
        const chosenLocations = req.body.chosenLocations;
    
        const result = [];
        let totalDistance = 0;
        let totalDuration = 0;

        for (var i = 0; i < chosenLocations.length - 1; i++){
            const [coords, routeSummary] = await oneMapRouting(chosenLocations[i], chosenLocations[i+1]);
            result.push(...coords);
            totalDistance += routeSummary["total_distance"]
            totalDuration += routeSummary["total_time"]
        }
        const combinedEncode = polyUtil.encode(result,6);
        res.status(200).send({route_geometry: combinedEncode, duration: totalDuration, distance: totalDistance})
    }
    catch(err){
        console.error(err.message);
        res.status(400).send(err.message);
    }
})

export default router;
