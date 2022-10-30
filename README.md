## TwoTyred (Backend)

This is the backend repo for our SC2006 SWE project, TwoTyred.
To run this file, you need to have Node.js `(Version 16.17.0)` installed.

### Tech Stack
1. [Express](https://expressjs.com/)
2. [Firebase](https://firebase.google.com/)

### Quick Start:
1. Run the following code in bash to install the required dependencies
```
npm install
```
2. Create a folder named "firebase-config" in the root directory. Within it, create a file called "service-account.json". Paste the service account information into "service-account.json" file
  
3. Create a folder named "onemap-config" in the root directory. Within it, create a file called "onemapCred.json". Paste the OneMap credentials into "onemapCred.json" file

### Scripts
Run `npm start` to launch the server using nodemon.

### File structure
- `server.js`: Contains the top level express object.
- `firebase.js`: Contains firestore and firebase auth initialisations
- `routes/*`: Contains all the api route logic
  - Each file in the routes directory contains the individual api logic, which each uses the Router() method.
  - `routes/index.js`: Will import all the api route logics
- `scripts/*`: Contains all helper functions
