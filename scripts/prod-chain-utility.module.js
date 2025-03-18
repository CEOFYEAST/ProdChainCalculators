/**
 * @module prod-chain-utility
 * @description Contains methods used to perform non-irptu-submission-related tasks
 * @author ceofyeast
 */

import {recipes,validIDs} from "./recipes.module.js"
import * as validators from "./validators.module.js"

function getUserDemand(prodChainData) {
    let userDemandData = {}
    for(let itemID in prodChainData){
        let itemUserDemand = prodChainData[itemID]["userIRPTU"]
        if(itemUserDemand > 0) userDemandData[itemID] = itemUserDemand
    }
    return userDemandData
}

function recalculateTimeUnit(prodChainObject, oldTimeUnit, newTimeUnit) {
    validators.validateProdChainObject(prodChainObject)
    validators.validateTimeUnit(newTimeUnit)

    let ratio = 1
    const timeUnitsInSeconds = {
        "second": 1,
        "minute": 60,
        "hour": 3600
    };
    ratio = timeUnitsInSeconds[newTimeUnit] / timeUnitsInSeconds[oldTimeUnit];

    let prodChainData = prodChainObject["prodChain"]
    for(let itemID in prodChainData){
        prodChainData[itemID]["userIRPTU"] *= ratio
        prodChainData[itemID]["intermIRPTU"] *= ratio

        for(let intermedItemID in prodChainData[itemID]["dependencyItems"]){
            prodChainData[itemID]["dependencyItems"][intermedItemID] *= ratio
        }
    }

    prodChainObject["prodChain"] = prodChainData
    prodChainObject["timeUnit"] = newTimeUnit
    return prodChainObject
}

export {
    getUserDemand, recalculateTimeUnit
}