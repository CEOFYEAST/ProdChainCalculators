/**
 * @module prod-chain-utility
 * @description Contains methods used to perform non-irptu-submission-related tasks
 * @author ceofyeast
 */

import { getTimeUnitConversionRatio } from "./helpers.module.js"
import * as validators from "./validators.module.js"
import recipes from './recipes.module.js'

function getUserDemand(prodChainData) {
    validators.validateProdChainData(prodChainData)

    let userDemandData = {}
    for(let itemID in prodChainData){
        let itemUserDemand = prodChainData[itemID]["userIRPTU"]
        if(itemUserDemand > 0) userDemandData[itemID] = itemUserDemand
    }
    return userDemandData
}

function getValidIDs(){
    return Object.keys(recipes)
}

function recalculateTimeUnit(prodChainObject, newTimeUnit) {
    validators.validateProdChainObject(prodChainObject)
    validators.validateTimeUnit(newTimeUnit)

    let oldTimeUnit = prodChainObject["timeUnit"]
    let ratio = getTimeUnitConversionRatio(oldTimeUnit, newTimeUnit)

    let prodChainData = prodChainObject["prodChain"]
    for(let itemID in prodChainData){
        prodChainData[itemID]["userIRPTU"] *= ratio
        prodChainData[itemID]["intermIRPTU"] *= ratio

        for(let intermedItemID in prodChainData[itemID]["dependentItems"]){
            prodChainData[itemID]["dependentItems"][intermedItemID] *= ratio
        }
    }

    prodChainObject["prodChain"] = prodChainData
    prodChainObject["timeUnit"] = newTimeUnit
    return prodChainObject
}

function createProductionChain(){
    if (arguments.length === 1 && typeof arguments[0] === 'string') {
        validators.validateTimeUnit(arguments[0])
        
        return {
            timeUnit: arguments[0],
            prodChain: {}
        }
    }  

    return {
        timeUnit: "minute",
        prodChain: {}
    }
}

export {
    getUserDemand, getValidIDs, recalculateTimeUnit, createProductionChain
}