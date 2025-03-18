/**
 * @module prod-chain-irptu
 * @description Acts as a wrapper class to expose the IRPTU-submission-related functionality in the calculators module
 * @author ceofyeast
 */

import * as Validators from "./validators.module.js"
import * as Calculators from "./irptu-calculators.module.js"
import {deepCopy} from "./helpers.module.js"

function addIRPTU(itemID, amount, prodChainObject) {
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

function subtractIRPTU(itemID, amount, prodChainObject) {
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