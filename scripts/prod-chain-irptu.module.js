/**
 * @module prod-chain-irptu
 * @description Acts as a wrapper class to expose the IRPTU-submission-related functionality in the calculators module
 * @author ceofyeast
 */

import * as Validators from "./validators.module.js"
import * as Calculators from "./irptu-calculators.module.js"
import { getTimeUnitConversionRatio } from "./helpers.module.js"
import {deepCopy} from "./helpers.module.js"

/**
 * Adds a given amount of demand per time unit of a given item to a given production chain object
 * @param {*The ID of the item being added to the production chain} itemID 
 * @param {*The amount of the item required per time unit} amount 
 * @param {*The production chain data being added to} prodChainObject 
 * @param {*(Optional) The time unit of the request; used to convert the required amount to the time unit of the production chain} timeUnit 
 * @returns THe updated production chain
 */
function addIRPTU(itemID, amount, prodChainObject, timeUnit) {
    let inputCopy = deepCopy(prodChainObject);

    Validators.validateID(itemID)
    Validators.validateNumber(amount)
    Validators.validateProdChainObject(inputCopy)
    Validators.validateURPSAddition(amount)

    let prodChainData = inputCopy["prodChain"]
    let demandInfoOutput = {}
    Calculators.calculateIntermediaryDemand(itemID, amount, demandInfoOutput)
    Calculators.updateProdChainIntermediaryDemand(prodChainData, demandInfoOutput)
    Calculators.updateProdChainUserDemand(itemID, amount, prodChainData)
    Calculators.clearEmptyData(prodChainData)

    inputCopy["prodChain"] = prodChainData
    return inputCopy;
}

/**
 * Subtracts a given amount of demand per time unit of a given item from a given production chain object
 * @param {*The ID of the item being removed from the production chain} itemID 
 * @param {*The amount of the item being removed per time unit} amount 
 * @param {*The production chain data being subtracted from} prodChainObject 
 * @param {*(Optional) The time unit of the request; used to convert the required amount to the time unit of the production chain} timeUnit 
 * @returns The updated production chain
 */
function subtractIRPTU(itemID, amount, prodChainObject, timeUnit) {
    let inputCopy = deepCopy(prodChainObject);

    Validators.validateID(itemID)
    Validators.validateNumber(amount)
    Validators.validateProdChainObject(inputCopy)
    let prodChainData = inputCopy["prodChain"]
    Validators.validateURPSSubtraction(itemID, amount, prodChainData)

    amount = amount * -1;
    let demandInfoOutput = {}
    Calculators.calculateIntermediaryDemand(itemID, amount, demandInfoOutput)
    Calculators.updateProdChainIntermediaryDemand(prodChainData, demandInfoOutput)
    Calculators.updateProdChainUserDemand(itemID, amount, prodChainData)
    Calculators.clearEmptyData(prodChainData)

    inputCopy["prodChain"] = prodChainData
    return inputCopy;
}

export {
    addIRPTU, subtractIRPTU
}