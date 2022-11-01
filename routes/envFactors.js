import { Router } from 'express'
import fetch from 'node-fetch';

const router = Router();

router.post("/", async (req, res)=>{
  try{

    const lat = req.body.lat 
    const lng = req.body.lng 
    
    //Date and Time
    const date = new Date();
    const currDate = date.toLocaleDateString('en-GB', { dateStyle: "medium", timeZone: "Asia/Singapore"});
    let currTime = date.toLocaleTimeString('en-GB', { timeStyle: "medium", timeZone: "Asia/Singapore"});
    const month = new Date().toLocaleString('en-US', { month: '2-digit' });
    var [day,, year] = currDate.split(" ");
    day = day < 10 ? '0' + day : day;
 
    const [hours, mins] = currTime.split(":");
    currTime = date.toLocaleTimeString('en-US', {timeZone: 'Asia/Singapore', hour12: true, hour: 'numeric', minute: 'numeric'});

    //Weather (location specific)
    //API documentation: https://data.gov.sg/dataset/weather-forecast
    var weatherStatus = "";
    const weatherURL = `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${year}-${month}-${day}T${hours}%3A${mins}%3A00`;
    const weatherRes = await fetch(weatherURL);
    const weatherJSON = await weatherRes.json();
    console.log(weatherURL);
    console.log(weatherJSON);
    const regions = weatherJSON['area_metadata'];
    const forecasts = weatherJSON['items'][0]["forecasts"];
    
    
    var regionName = ""
    for (const r of regions){
      const coords = r['label_location'];
      if ((Math.abs(coords['latitude'] - lat) <= 0.03) && (Math.abs(coords['longitude'] - lng) <= 0.03)){
        regionName = r['name'];
      }
    }
    
    for (const f of forecasts){
      if (f['area'] == regionName){
        weatherStatus = f['forecast'];
      }
    }

    //temperature (location specific)
    //API documentation: https://data.gov.sg/dataset/realtime-weather-readings
    var temperature = "";
    const temperatureURL = `https://api.data.gov.sg/v1/environment/air-temperature?date_time=${year}-${month}-${day}T${hours}%3A${mins}%3A00`;
    const temperatureRes = await fetch(temperatureURL);
    const temperatureJSON = await temperatureRes.json();
    
    const stations = temperatureJSON['metadata']['stations'];
    const readings = temperatureJSON['items'][0]["readings"];
    
    
    var stationId = ""
    for (const s of stations){
      const coords = s['location'];
      if ((Math.abs(coords['latitude'] - lat) <= 0.20) && (Math.abs(coords['longitude'] - lng) <= 0.20)){
        stationId = s['id'];
      }
    }
    
    for (const r of readings){
      if (r['station_id'] == stationId){
        temperature = r['value'];
      }
    }

    //Pollution 
    //API Documentation: https://data.gov.sg/dataset/psi
    const polluteURL = `https://api.data.gov.sg/v1/environment/psi?date_time=${year}-${month}-${day}T${hours}%3A${mins}%3A00`
    const polluteRes = await fetch(polluteURL);
    const polluteJSON = await polluteRes.json();
    const pReadings = polluteJSON['items'][0]['readings']
    const psi24 = pReadings['psi_twenty_four_hourly']['national']
    const pm25 = pReadings['pm10_sub_index']['national']
    
    const responseObj = {
      "date": currDate,
      "time": currTime,
      "weatherStatus": weatherStatus,
      "temperature": temperature,
      "24HourPSI": psi24,
      "PM2.5": pm25
    }
    res.status(200).send((responseObj)) 
  }
  catch(err){
    console.error(err.message);
    res.status(400).send("Unsuccessful: Unable to get environment factors");
  }
})

export default router;
