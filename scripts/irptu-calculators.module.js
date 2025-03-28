/**
 * @module irptu-calculators
 * @description Exposes methods related to calculating and updating the demand for production chains
 * @author ceofyeast
 */

import recipes from "./recipes.module.js"

function calculateIntermediaryDemand(reqItem_ID, reqItem_IRPTU, demandOutput){
    let reqItem_Info = recipes[reqItem_ID]; // general info about item
    let reqItem_Type = reqItem_Info["Type"]; // type of item i.e. Machinery, Intermediate product

    // base case
    if (reqItem_Type == "Resource" || reqItem_Type == "Liquid") {
        return;
    }

    let reqItem_Recipe = reqItem_Info["recipe"]; // info about how to craft item
    let reqItem_IPPC = reqItem_Recipe["yield"]; // items produced per craft
    let reqItem_CRPTU = reqItem_IRPTU / reqItem_IPPC; // crafts required per time unit 
    let reqItem_Intermediaries = reqItem_Recipe["ingredients"]; // info about intermediary items used to craft the reqItem

    // runs for every intermediary item
    for (let key in reqItem_Intermediaries) {
        let intermediary_Object = reqItem_Intermediaries[key];
        let intermediary_ID = intermediary_Object["id"];
        let intermediary_IRPC = intermediary_Object["amount"]; // intermediary items required per reqItem craft
        let intermediary_IRPTU = 0 // intermediary items required per time unit

        // handles rare case where recipe yield is null; doesn't actually solve the problem, but it ensures that no bugs occur
        if(reqItem_IPPC != null){
            intermediary_IRPTU = intermediary_IRPC * reqItem_CRPTU;
        }

        tryAddRequiredItem(intermediary_ID, demandOutput);
        demandOutput[intermediary_ID]["IRPTU"] += intermediary_IRPTU;

        tryAddIntermediaryItem(reqItem_ID, intermediary_ID, demandOutput)
        demandOutput[intermediary_ID]["dependentItems"][reqItem_ID] += intermediary_IRPTU;

        calculateIntermediaryDemand(intermediary_ID, intermediary_IRPTU, demandOutput);
    }
}

/**
 * Adds the demand from the supplied demand data object to the supplied production chain data object
 * Demand being added can be positive or negative
 */
function updateProdChainIntermediaryDemand(prodChainData, demandOutput){
    for (let requiredItemID in demandOutput) {
        tryAddItemData(requiredItemID, prodChainData)

        let requiredItemDemand = demandOutput[requiredItemID]
        let requiredItemData = prodChainData[requiredItemID]
        requiredItemData["intermIRPTU"] += requiredItemDemand["IRPTU"]

        for(let intermediaryItemID in requiredItemDemand["dependentItems"]){
            if (!requiredItemData["dependentItems"].hasOwnProperty(intermediaryItemID)) {
                requiredItemData["dependentItems"][intermediaryItemID] = 0;
            }

            requiredItemData["dependentItems"][intermediaryItemID] += 
            requiredItemDemand["dependentItems"][intermediaryItemID];

            if (requiredItemData["dependentItems"][intermediaryItemID] == 0) {
                delete requiredItemData["dependentItems"][intermediaryItemID];
            }
        }

        prodChainData[requiredItemID] = requiredItemData;
    }
}

function updateProdChainUserDemand(itemID, amount, prodChainData){
    tryAddItemData(itemID, prodChainData);

    prodChainData[itemID]["userIRPTU"] += amount
}

function clearEmptyData(prodChainData){
    for(let itemID in prodChainData){
        let itemData = prodChainData[itemID]
        if(itemData["userIRPTU"] == 0 && itemData["intermIRPTU"] == 0) {
            delete prodChainData[itemID];
        }
    }
}

function tryAddItemData(itemID, prodChainData) {
    // adds ingredient representation to output if it doesn't already exist.
    if (!prodChainData.hasOwnProperty(itemID)) {
        let itemData = {
            userIRPTU: 0,
            intermIRPTU: 0,
            dependentItems: {}
        };
        prodChainData[itemID] = itemData;
    }
}

function tryAddRequiredItem(itemID, demandOutput) 
{
  if(!(demandOutput.hasOwnProperty(itemID))){
    let itemData = {
      IRPTU: 0,
      dependentItems: {}
    };
    demandOutput[itemID] = itemData;
  }
}

function tryAddIntermediaryItem(requiredItemID, intermediaryItemID, demandOutput) 
{
    if(!(demandOutput[intermediaryItemID]["dependentItems"].hasOwnProperty(requiredItemID))){
        demandOutput[intermediaryItemID]["dependentItems"][requiredItemID] = 0;
    }
}

export {
    calculateIntermediaryDemand,
    updateProdChainIntermediaryDemand,
    updateProdChainUserDemand,
    clearEmptyData
}