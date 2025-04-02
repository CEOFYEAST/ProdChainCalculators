/**
 * @module validators
 * @description This module provides functions for validating various types of values, such as IDs, recipes, prod chain data/objects, booleans, and numbers.
 * @author ceofyeast
 */

import recipes from "./recipes.module.js"
import { getItemIDs } from "./prod-chain-utility.module.js";
import {validTimeUnits} from "./helpers.module.js"
import config from "./config.module.js"

let validationFailedListeners = new Array()

function handleValidationFailed(err){
    if(config.debugMode) console.log(err.message)
    for(let i = 0; i < validationFailedListeners.length; i++){
        validationFailedListeners[i](err);
    }
}

export function addValidationFailedListener(listener){
    validationFailedListeners.push(listener)
}

export function ensureNonNullish(val)
{
    if(val === undefined)
    {
        let err = Error("Value is undefined\n");
        handleValidationFailed(err)
    }
    else if(val === null)
    {
        let err = Error("Value is null\n");
        handleValidationFailed(err)
    }
}

export function validateID(id) {
    ensureNonNullish(id);

    if (!(typeof id === 'string')) {
        let err = Error("ID must be of type string, is of type " + typeof id + "\n");
        handleValidationFailed(err)
    }

    validateRecipes(recipes);

    if (id == "") {
        let err = Error("id cannot be empty\n");
        handleValidationFailed(err)
    }
    if (!getItemIDs().includes(id)) {
        let err = Error("Recipe with id '" + id + "' not found in recipesDict\n");
        handleValidationFailed(err)
    }
}

export function validateRecipes(recipes) {
    ensureNonNullish(recipes);
    validateObject(recipes);
}

export function validateProdChainObject(prodChainObject) {
    ensureNonNullish(prodChainObject);
    validateObject(prodChainObject);
    if (!(prodChainObject.hasOwnProperty("prodChain")) || !(prodChainObject.hasOwnProperty("timeUnit"))) {
        let err = Error("Supplied production chain object is invalid");
        handleValidationFailed(err)
    }

    validateTimeUnit(prodChainObject["timeUnit"])
    validateProdChainData(prodChainObject['prodChain'])
}

export function validateProdChainData(prodChainData) {
    ensureNonNullish(prodChainData);
    validateObject(prodChainData);
    for (let key in prodChainData) {
        if (!getItemIDs().includes(key)) {
            let err = Error("Invalid key '" + key + "' in production chain data\n");
            handleValidationFailed(err)
        }
    }
}

export function validateObject(val){
    ensureNonNullish(val);

    if(!(typeof val === 'object')){
        let err = Error(typeof val + " is not of type object\n");
        handleValidationFailed(err)
    }
}

export function validateNumber(val) {
    ensureNonNullish(val);

    if(!(typeof val === 'number' && !isNaN(val))) {
        let err = Error(typeof val + " is not a number\n");
        handleValidationFailed(err)
    }
}

export function validateTimeUnit(timeUnit){
    ensureNonNullish(timeUnit);

    if (!(typeof timeUnit === 'string')) {
        let err = Error("Time unit must be of type string, is of type " + typeof timeUnit + "\n");
        handleValidationFailed(err)
    }

    if (!validTimeUnits.includes(timeUnit)) {
        let err = Error("Time unit must be one of " + validTimeUnits.join(', ') + "\n");
        handleValidationFailed(err)
    }
}

export function validateIRPTUAddition(amount){
    if(amount <= 0) {
        let err = Error("Invalid Addition Amount\n");
        handleValidationFailed(err)
    }
}

export function validateIRPTUSubtraction(itemID, amount, prodChainData){
    if (prodChainData.hasOwnProperty(itemID)) {
        let itemData = prodChainData[itemID];
        let existingItemDemand = itemData["userIRPTU"];

        if (amount > existingItemDemand) {
            let err = Error("Cannot remove more user demand than the item already has, so must be less than or equal to " + existingItemDemand + "\n");
            handleValidationFailed(err)
        }
    }
    else {
        let err = Error("Cannot remove user demand from item that doesn't exist in the production chain\n");
        handleValidationFailed(err)
    }
}