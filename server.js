/* 
 * Express Server Re-write 
 * James Plante
 */

// Constants and rates

let appdata = [
  { uid: 0, loc: 0, cursors: 0, hobbyists: 0, csMajors: 0, softEngs: 0, server: 0, quantumComputers: 0, totalLoc: 0 }
]

const costs = {
  cursors: 150,
  hobbyists: 1000,
  csMajors: 12000,
  softEngs: 150000,
  serverFarm: 500000,
  quantumComputers: 3000000
}

const express = require('express'),
  app = express(),
  session = require('express-session'),
  passport = require('passport'),
  bodyParser = require('body-parser')
pLocal = require('passport-local');

app.use(express.static('.'))
app.use(bodyParser.json())

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/public/game.html');
})

app.get("/getAllData", function (request, response) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(appdata));
});

app.get("/getData/:id", function (request, response) {
  let uid = request.params.id;
  console.log("UID: " + uid);
  // Check if a number. If so, check for ID in array
  if (isNaN(uid)) {
    console.log("INVALID FIELD")
    response.writeHeader(404)
    response.end('404 Error: File Not Found')
  } else {
    response.writeHeader(200, { 'Content-type': 'text/plain' })
    let foundUID = false;
    // Look through the given data for a UID and send the JSON as a response
    for (let i = 0; i < appdata.length; i++) {
      if (appdata[i].uid == uid) {
        response.end(JSON.stringify(appdata[i]))
        foundUID = true;
      }
    }
    if (!foundUID) {
      // If cannot find UID, add to array and pretend nothing happened 
      let newUID = { uid: uid, loc: 0, cursors: 0, hobbyists: 0, csMajors: 0, softEngs: 0, server: 0, quantumComputers: 0, totalLoc: 0 }
      appdata.push(newUID)
      console.log("New UID Created!")
      response.end(JSON.stringify(newUID))
    }
  }
});

app.get("/getUID", function (request, response) {
  let newUID = generateRandomUID(3000000)
  // Write new data to array
  appdata.push({ uid: newUID, loc: 0, cursors: 0, hobbyists: 0, csMajors: 0, softEngs: 0, server: 0, quantumComputers: 0, totalLoc: 0 })

  response.writeHeader(200, { 'Content-Type': 'text/plain' })
  response.write(String(newUID));
  response.end()
});

app.post("/updateData", function (request, response) {
  response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
  let body = request.body;
  console.log(JSON.stringify(body))
  // Action: getData = get the data from the server given UID and send it back to client
  switch (body.action) {
    // Get a unique UID and send it back.
    case "modifyData":
      console.log(body)
      if (addDeltaToAppData(body)) {
        response.end("Transaction Completed")
      } else {
        response.end("Not enough money")
      }
  }
});

/***
 * Generates a random unique UID and returns it. It also create
 */
const generateRandomUID = function (n) {
  console.log("Generating new UID")
  let tempUID = Math.floor(Math.random() * n)
  let foundUID = true;
  let match = false;

  while (!foundUID) {
    // Look through the given data for a UID. If found, then generate a new number.
    tempUID = Math.floor(Math.random() * n)
    for (let i = 0; i < appdata.length; i++) {
      if (appdata[i].uid == tempUID) {
        match = true;
      }
    }

    if (!match) {
      foundUID = true;
    }
  }
  console.log("Found new ID! UID: " + String(tempUID))
  return tempUID;
}

/***
 * Calculates the cost of a given purchase given a delta object
 */
const calculateCost = function (delta) {
  return (costs.cursors * delta.cursors)
    + (costs.hobbyists * delta.hobbyists) +
    (costs.csMajors * delta.csMajors) +
    (costs.softEngs * delta.softEng) +
    (costs.serverFarm * delta.server) +
    (costs.quantumComputers * delta.quantum);
}

/**
 * Given a delta object, either add the necessary purchased elements
 * to the cached object and return true, or if the user does not
 * have enough loc, then return false
 */
const addDeltaToAppData = function (delta) {
  // Look through the given data for a UID.
  console.log("NEW DELTA: " + JSON.stringify(delta))
  for (let i = 0; i < appdata.length; i++) {
    if (appdata[i].uid == delta.uid) {
      let totalCost = calculateCost(delta);
      console.log("Purchase UID: " + delta.uid);
      // If the cost is too great, return false
      if ((delta.currentLOC - totalCost) < 0) {
        appdata[i].totalLoc += (delta.currentLOC - appdata[i].loc)
        appdata[i].loc = delta.currentLOC;
        return false;
        // Else, store all of the delta values in the existing database
      } else {
        appdata[i].totalLoc += (delta.currentLOC - appdata[i].loc)
        appdata[i].loc = delta.currentLOC - totalCost;
        appdata[i].cursors += delta.cursors;
        appdata[i].hobbyists += delta.hobbyists;
        appdata[i].csMajors += delta.csMajors;
        appdata[i].softEngs += delta.softEng;
        appdata[i].server += delta.server;
        appdata[i].quantumComputers += delta.quantum;
        return true;
      }
    }
  }
  return false;
}

app.listen(process.env.PORT || 3000)