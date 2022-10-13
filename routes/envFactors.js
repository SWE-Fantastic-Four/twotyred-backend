import {Router} from 'express'

const router = Router();

function toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', {
      month: 'short',
    });
}

function formatDate(i){
  return (i < 10 ? '0': '') + i
}

router.post("/", async (req, res)=>{
  try{

    const lat = req.body.lat 
    const lng = req.body.lng 
    
    //Date and Time
    const timeObj = new Date();
    
    const day = formatDate(timeObj.getDate());

    const month = formatDate(timeObj.getMonth() +  1);
    const year = timeObj.getFullYear();
    const currDate = day + ' ' + toMonthName(timeObj.getMonth()+1) + ' ' + year
    
    const hours = formatDate(timeObj.getHours());
  
    const mins = formatDate(timeObj.getMinutes());

    const currTime = hours % 12 + ':' + mins + ' ' + (hours > 12 ? "PM" : "AM")
    

    //Weather (location specific)
    //API documentation: https://data.gov.sg/dataset/weather-forecast
    var weatherStatus = "";
    const weatherURL = `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${year}-${month}-${day}T${hours}%3A${mins}%3A00`;
    console.log(weatherURL);
    const weatherRes = await fetch(weatherURL);
    const weatherJSON = await weatherRes.json();
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
    console.log(temperatureURL);
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
    res.status(400).send("Unsuccesful: Unable to get environment factors");
  }
})

export default router;