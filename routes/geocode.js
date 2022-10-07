import { Router } from "express";
import getOneMapAuth from "../scripts/getOneMapAuth.js";
import fetch from "node-fetch";

const router = Router();

router.post("/", async(req, res) => {
  const { lat, lng } = req.body;
  try {
    const token = await getOneMapAuth();
    const fetchResponse = await fetch(`https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=${lat},${lng}&token=${token}&buffer=300`);
    let resJSON = await fetchResponse.json();
    resJSON = resJSON["GeocodeInfo"];
    if (resJSON.length === 0) {
      throw new Error("No locations found");
    }
    resJSON = resJSON[0]
    const resObj = {}
    if ("BUILDINGNAME" in resJSON && resJSON["BUILDINGNAME"] !== "null") {
      resObj["address"] = resJSON["BUILDINGNAME"]
    } else if ("ROAD" in resJSON) {
      resObj["address"] = resJSON["ROAD"]
    } else if ("FEATURE_NAME" in resJSON) {
      resObj["address"] = resJSON["FEATURE_NAME"]
    } else {
      throw new Error("Invalid set of coordinates"); 
    }
    res.status(200).json(resObj);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
