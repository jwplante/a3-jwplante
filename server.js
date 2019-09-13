/* 
 * Express Server Re-write 
 * James Plante
 */

// Constants and rates
const costs = {
    cursors: 150,
    hobbyists: 1000,
    csMajors: 12000,
    softEngs: 150000,
    serverFarm: 500000,
    quantumComputers: 3000000
}
  
  let rates = {
    cursors: 1,
    hobbyists: 10,
    csMajors: 30,
    softEng: 50,
    server: 70,
    quantum: 110
}
const express = require('express'),
      app = express(),
      session = require('express-session'),
      passport = require('passport'),
      bodyParser = require('body-parser')
      pLocal = require('passport-local');

app.use( express.static('public') )
app.use( bodyParser.json() )

app.get('/', function(request, response){
    response.sendFile(__dirname + '/public/index.html');
})

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
  for (let i = 0; i < appdata.length; i++) {
    if (appdata[i].uid == delta.uid) {
      let totalCost = calculateCost(delta);
      console.log("Purchase UID: " + delta.uid );
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

app.listen( process.env.PORT || 3000 )