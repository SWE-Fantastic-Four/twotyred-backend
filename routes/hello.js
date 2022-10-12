    //temperature (location specific)
    //API documentation: https://data.gov.sg/dataset/temperature-forecast
    var temperatureStatus = "";
    const temperatureURL = `https://api.data.gov.sg/v1/environment/2-hour-temperature-forecast?date_time=${year}-${month}-${day}T${hours}%3A${mins}%3A00`;
    console.log(temperatureURL);
    const temperatureRes = await fetch(temperatureURL);
    const temperatureJSON = await temperatureRes.json();
    const regions = temperatureJSON['area_metadata'];
    const forecasts = temperatureJSON['items'][0]["forecasts"];
    
    
    var regionName = ""
    for (const r of regions){
      const coords = r['label_location'];
      if ((Math.abs(coords['latitude'] - lat) <= 0.03) && (Math.abs(coords['longitude'] - lng) <= 0.03)){
        regionName = r['name'];
      }
    }
    
    for (const f of forecasts){
      if (f['area'] == regionName){
        temperatureStatus = f['forecast'];
      }
    }