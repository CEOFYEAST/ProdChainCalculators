/**
 * Acts as the entrypoint for the node server.
 * 
 * @module index
 * @author Benton Diebold (CEOFYEAST)
 */

//import {calculateIntermediaryDemand, updateProductionChainDemand} from "./irptu-calculators.module.js"
import * as irptuSubMethods from "./prod-chain-irptu.module.js"

// let demandOutput = {}
// calculateIntermediaryDemand("burner-inserter", 10, demandOutput)

let prodChainObject = {
    timeUnit: "minute",
    prodChain: {}
}
// irptuSubMethods.addIRPTU("inserter", 10, prodChainObject)
// console.log(prodChainObject);
irptuSubMethods.addIRPTU("burner-inserter", 10, prodChainObject)
console.log(prodChainObject);
// irptuSubMethods.subtractIRPTU("burner-inserter", 10, prodChainObject)
// console.log(prodChainObject);


// const { calculateChildrenURPS } = require('./calculators.module.js');
// const { getJSON, writeObj } = require('./utility.module.js');
// const { updateProduction, updateProductionURPS } = require('./output.module.js');
// //const { connect } = require('./db.module.js');
// const fs = require('fs');
// const fsPromises = require('fs').promises; 

// var recipes = getJSON(recipesLoc);
// let output = {};
// updateProductionURPS('inserter', 1, false, recipes, output);
// fsPromises.writeFile(testDataLoc, JSON.stringify(output, null, 4))
//     .then(() => {
//         console.log("File has been written successfully");
//     })
//     .then(() => {
//         output = getJSON(testDataLoc);
//         updateProductionURPS('long-handed-inserter', 1, false, recipes, output);
//         return fsPromises.writeFile(testDataLoc, JSON.stringify(output, null, 4))
//     })
//     .then(() => {
//         output = getJSON(testDataLoc);
//         updateProductionURPS('automation-science-pack', 1, false, recipes, output);
//         return fsPromises.writeFile(testDataLoc, JSON.stringify(output, null, 4))
//     })
//     .then(() => {
//         output = getJSON(testDataLoc);
//         updateProductionURPS('assembling-machine-1', 0.2, false, recipes, output);
//         return fsPromises.writeFile(testDataLoc, JSON.stringify(output, null, 4))
//     })
//     .catch((err) => {
//         console.error(err);
//         return;
//     });



//connect();


