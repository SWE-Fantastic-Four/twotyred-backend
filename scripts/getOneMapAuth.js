import onemapCreds from "../onemap-config/onemapCred.json" assert {type:"json"}
import fetch from "node-fetch";

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
    const access_token = resJSON.access_token;
    return access_token;
  } catch (err){
    throw new Error(err.message);
  }
}

export default getOneMapAuth;
