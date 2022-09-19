## SWE Backend

This is the backend repo for the SC2006 SWE project.

Stack: NodeJS, express

To run this file,, you need to have nodeJS v16.17 installed.

### Quick Start:
Run the following code in to install express and nodemon
```
npm install express nodemon

```

### Scripts
Run ```npm start``` to launch the server using nodemon.

### File structure
- ./server.js: Contains the top level express object.
- ./routes/: Contains all the api route logic
  - Each file in the routes directory contains the individual api logic, which each uses the Router() method.
  - ./server/index.js: Will import all the api route logics