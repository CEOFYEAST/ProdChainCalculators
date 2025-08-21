/**
 * @module irptu-calculators
 * @description Exposes methods related to calculating and updating the demand for production chains
 * @author ceofyeast
 */

import recipes from "./recipes.module.js"
import { getTimeUnitConversionRatio } from "./helpers.module.js"
import { getItemIconPath } from "./prod-chain-utility.module.js"

function calculateIntermediaryDemand(reqItem_ID, reqItem_IRPTU, demandOutput){
    tryAddRequiredItemDemand(reqItem_ID, demandOutput)

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

        tryAddRequiredItemDemand(intermediary_ID, demandOutput);

        addIntermediaryDemand(intermediary_ID, intermediary_IRPTU, demandOutput);

        addDependentDemand(reqItem_ID, intermediary_ID, intermediary_IRPTU, demandOutput);

        addIngredientDemand(reqItem_ID, intermediary_ID, intermediary_IRPTU, demandOutput);

        // recursive step
        calculateIntermediaryDemand(intermediary_ID, intermediary_IRPTU, demandOutput);
    }
}

/**
 * Adds the demand from the supplied demand data object to the supplied production chain data object
 * Demand being added can be positive or negative
 */
function updateProdChainIntermediaryDemand(prodChainData, demandOutput){
    for (let requiredItemID in demandOutput) {
        tryAddRequiredItemData(requiredItemID, prodChainData)

        // update top-level item demand
        let requiredItemDemand = demandOutput[requiredItemID]
        let requiredItemData = prodChainData[requiredItemID]
        requiredItemData["intermIRPTU"] += requiredItemDemand["IRPTU"]

        // update dependent items demand
        const dependentItemsDemand = requiredItemDemand["dependentItems"]
        const dependentItemsData = requiredItemData["dependentItems"]
        for(let dependentItemID in dependentItemsDemand){
            if (!dependentItemsData.hasOwnProperty(dependentItemID)) {
                tryAddDependentData(dependentItemID, requiredItemData)
            }
            const dependentItemData = requiredItemData["dependentItems"][dependentItemID]
            dependentItemData["IRPTU"] += dependentItemsDemand[dependentItemID];
            if (dependentItemData[dependentItemID] == 0) {
                delete requiredItemData["dependentItems"][dependentItemID];
            }
        }

       // update ingredient items demand
        const ingredientItemsDemand = requiredItemDemand["ingredientItems"]
        for(let ingredItemID in ingredientItemsDemand){
            const ingredientItemsData = requiredItemData["ingredientItems"]
            if (!ingredientItemsData.hasOwnProperty(ingredItemID)) {
                tryAddIngredientData(ingredItemID, requiredItemData)
            }
            const ingredItemData = requiredItemData["ingredientItems"][ingredItemID]
            ingredItemData["IRPTU"] += ingredientItemsDemand[ingredItemID];
            if (ingredItemData[ingredItemID] == 0) {
                delete requiredItemData["ingredientItems"][ingredItemID];
            }
        }

        prodChainData[requiredItemID] = requiredItemData;
    }

    return prodChainData
}

function updateProdChainUserDemand(itemID, amount, prodChainData){
    tryAddRequiredItemData(itemID, prodChainData);

    prodChainData[itemID]["userIRPTU"] += amount
}

function updateProdChainCrafterDemand(prodChainData, timeUnit, crafterConfig) {
   
    for (let reqItemID in prodChainData) {
        const reqItemData = { ...prodChainData[reqItemID] } // copy is used to avoid side-effects

        // update top-level item's crafter demand
        const reqItemDemand = reqItemData["userIRPTU"] + reqItemData["intermIRPTU"];
        addOrUpdateCrafterData(reqItemID, reqItemDemand, timeUnit, crafterConfig, reqItemData)

        // update dependent items' crafter demands
        const dependentItems = reqItemData["dependentItems"]
        for(let dependentItemID in dependentItems){
            const dependentData = dependentItems[dependentItemID]
            const dependentDemand = dependentData["IRPTU"]
            addOrUpdateCrafterData(dependentItemID, dependentDemand, timeUnit, crafterConfig, dependentData)
        }

        // update ingredient items' crafter demands
        const ingredItems = reqItemData["ingredientItems"]
        for(let ingredItemID in ingredItems){
            const ingredData = ingredItems[ingredItemID]
            const ingredDemand = ingredData["IRPTU"]
            addOrUpdateCrafterData(ingredItemID, ingredDemand, timeUnit, crafterConfig, ingredData)
        }

        prodChainData[reqItemID] = reqItemData
    }

    return prodChainData
}

function updateProdChainBeltDemand(prodChainData, timeUnit, beltConfig) {

    for (let reqItemID in prodChainData) {
        const reqItemData = { ...prodChainData[reqItemID] } // copy is used to avoid side-effects

        // update top-level item's crafter demand
        const reqItemDemand = reqItemData["userIRPTU"] + reqItemData["intermIRPTU"];
        addOrUpdateBeltData(reqItemID, reqItemDemand, timeUnit, beltConfig, reqItemData)

        // update dependent items' crafter demands
        const dependentItems = reqItemData["dependentItems"]
        for(let dependentItemID in dependentItems){
            const dependentData = dependentItems[dependentItemID]
            const dependentDemand = dependentData["IRPTU"]
            addOrUpdateBeltData(dependentItemID, dependentDemand, timeUnit, beltConfig, dependentData)
        }

        // update ingredient items' crafter demands
        const ingredItems = reqItemData["ingredientItems"]
        for(let ingredItemID in ingredItems){
            const ingredData = ingredItems[ingredItemID]
            const ingredDemand = ingredData["IRPTU"]
            addOrUpdateBeltData(ingredItemID, ingredDemand, timeUnit, beltConfig, ingredData)
        }

        prodChainData[reqItemID] = reqItemData
    }

    return prodChainData
}

function tryAddRequiredItemData(itemID, prodChainData) {
    // adds ingredient representation to output if it doesn't already exist.
    if (!prodChainData.hasOwnProperty(itemID)) {
        const name = recipes[itemID]["name"];
        const thumbPath = getItemIconPath(name)
        let itemData = {
            name,
            thumbPath,
            userIRPTU: 0,
            intermIRPTU: 0,
            dependentItems: {},
            ingredientItems: {}
        };
        prodChainData[itemID] = itemData;
    }
}

function tryAddDependentData(dependentItemID, requiredItemData) {
    requiredItemData["dependentItems"][dependentItemID] = {
        IRPTU: 0,
    }
}

function tryAddIngredientData(ingredItemID, requiredItemData) {
    requiredItemData["ingredientItems"][ingredItemID] = {
        IRPTU: 0,
    }
}

function addOrUpdateCrafterData(itemID, itemDemand, timeUnit, crafterConfig, itemData) {
    let crafterCategory = recipes[itemID]["crafter-category"];
    const crafter = crafterConfig[crafterCategory];
    const crafterName = recipes[crafter]["name"]
    const crafterThumbPath = getItemIconPath(crafterName)
    const crafterCount = calculateCrafterCount(crafter, itemID, itemDemand, timeUnit)

    itemData = {
        ...itemData,
        crafterThumbPath,
        crafter,
        crafterCount
    }
}

function addOrUpdateBeltData(itemID, itemDemand, timeUnit, beltConfig, itemData) {
    const belt = beltConfig["belt-type"]
    const beltName = recipes[belt]["name"]
    const beltThumbPath = getItemIconPath(beltName)
    const beltCount = calculateBeltCount(belt, itemDemand, timeUnit)

    itemData = {
        ...itemData,
        belt,
        beltName,
        beltThumbPath,
        beltCount
    }
}

function tryAddRequiredItemDemand(itemID, demandOutput) 
{
  if(!(demandOutput.hasOwnProperty(itemID))){
    let itemData = {
      IRPTU: 0,
      dependentItems: {},
      ingredientItems: {}
    };
    demandOutput[itemID] = itemData;
  }
}

function addIntermediaryDemand(intermediaryItemID, intermediary_IRPTU, demandOutput)
{
    demandOutput[intermediaryItemID]["IRPTU"] += intermediary_IRPTU;
}

function addDependentDemand(requiredItemID, intermediaryItemID, intermediary_IRPTU, demandOutput) 
{
    if(!(demandOutput[intermediaryItemID]["dependentItems"].hasOwnProperty(requiredItemID))){
        demandOutput[intermediaryItemID]["dependentItems"][requiredItemID] = 0;
    }
    demandOutput[intermediaryItemID]["dependentItems"][requiredItemID] += intermediary_IRPTU;
}

function addIngredientDemand(requiredItemID, intermediaryItemID, ingredient_IRPTU, demandOutput)
{
    if(!(demandOutput[requiredItemID]["ingredientItems"].hasOwnProperty(intermediaryItemID))){
        demandOutput[requiredItemID]["ingredientItems"][intermediaryItemID] = 0;
    }
    demandOutput[requiredItemID]["ingredientItems"][intermediaryItemID] += ingredient_IRPTU;
}

function clearEmptyData(prodChainData){
    for(let itemID in prodChainData){
        let itemData = prodChainData[itemID]
        if(itemData["userIRPTU"] == 0 && itemData["intermIRPTU"] == 0) {
            delete prodChainData[itemID];
        }
    }
}

function calculateCrafterCount(crafterID, demandedItemID, demandIRPTU, demandTimeUnit) {
    const recipe = recipes[demandedItemID]
    const craftTime = recipe["recipe"]["time"]
    const recipeYield = recipe["recipe"]["yield"]
    if(craftTime === null || recipeYield === null) {
        return "N/A"
    }
    const crafterSpeed = recipes[crafterID]["crafting-speed"]
    const craftTimePerItem = (craftTime / crafterSpeed) / recipeYield;
    const craftRate = getTimeUnitConversionRatio("second", demandTimeUnit) / craftTimePerItem;
    const craftersRequired = demandIRPTU / craftRate;
    return craftersRequired
}

function calculateBeltCount(belt, itemDemand, timeUnit) {
    const throughputInSeconds = recipes[belt]["throughput"]
    const throughputInTimeUnit = throughputInSeconds * getTimeUnitConversionRatio("second", timeUnit);
    const beltsRequired = itemDemand / throughputInTimeUnit;
    return beltsRequired
}

export {
    calculateIntermediaryDemand,
    updateProdChainIntermediaryDemand,
    updateProdChainUserDemand,
    updateProdChainCrafterDemand,
    updateProdChainBeltDemand,
    clearEmptyData
}