## SWE Backend

This is the backend repo for the SC2006 SWE project.

Stack: NodeJS, express

To run this file, you need to have nodeJS v16.17 installed.

### Quick Start:
- Run the following code in to install the required dependencies
```
npm install express cors firebase-admin
npm install -D nodemon
```
- Create a file named "firebase-config" in the root directory. Within it, create a file called "service-account.json". Paste the service account information into "service-account.json" file

### Scripts
Run `npm start` to launch the server using nodemon.

### File structure
- `./server.js`: Contains the top level express object.
- `./routes/*`: Contains all the api route logic
  - Each file in the routes directory contains the individual api logic, which each uses the Router() method.
  - `./server/index.js`: Will import all the api route logics
