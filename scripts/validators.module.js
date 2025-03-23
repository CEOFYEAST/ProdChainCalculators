/**
 * @module validators
 * @description This module provides functions for validating various types of values, such as IDs, recipes, output, booleans, and numbers.
 * @author ceofyeast
 */

import recipes from "./recipes.module.js"
import { getValidIDs } from "./prod-chain-utility.module.js";
import {validTimeUnits} from "./helpers.module.js"
 
export function ensureNonNullish(val)
{
    if(val === undefined)
    {
        let err = Error("Value is undefined\n");
        throw err.stack;
    }
    else if(val === null)
    {
        let err = Error("Value is null\n");
        throw err.stack;
    }
}

export function validateID(id) {
    ensureNonNullish(id);

    if (!(typeof id === 'string')) {
        let err = Error("ID must be of type string, is of type " + typeof id + "\n");
        throw err.stack;
    }

    validateRecipes(recipes);

    if (id == "") {
        let err = Error("id cannot be empty\n");
        throw err.stack;
    }
    if (!getValidIDs().includes(id)) {
        let err = Error("Recipe with id '" + id + "' not found in recipesDict\n");
        throw err.stack;
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
        throw err.stack;
    }

    validateTimeUnit(prodChainObject["timeUnit"])
}

export function validateProdChainData(prodChainData) {
    ensureNonNullish(prodChainData);
    validateObject(prodChainData);
    for (let key in prodChainData) {
        if (!getValidIDs().includes(key)) {
            let err = Error("Invalid key '" + key + "' in production chain data\n");
            throw err.stack;
        }
    }
}

export function validateObject(val){
    ensureNonNullish(val);

    if(!(typeof val === 'object')){
        let err = Error(typeof val + " is not of type object\n");
        throw err.stack;
    }
}

export function validateNumber(val) {
    ensureNonNullish(val);

    if(!(typeof val === 'number' && !isNaN(val))) {
        let err = Error(typeof val + " is not a number\n");
        throw err.stack;
    }
}

export function validateTimeUnit(timeUnit){
    ensureNonNullish(timeUnit);

    if (!(typeof timeUnit === 'string')) {
        let err = Error("Time unit must be of type string, is of type " + typeof timeUnit + "\n");
        throw err.stack;
    }

    if (!validTimeUnits.includes(timeUnit)) {
        let err = Error("Time unit must be one of " + validTimeUnits.join(', ') + "\n");
        throw err.stack;
    }
}

export function validateIRPTUAddition(amount){
    if(amount <= 0) {
        let err = Error("Invalid Addition Amount\n");
        throw err.stack;
    }
}

export function validateIRPTUSubtraction(itemID, amount, prodChainData){
    if (prodChainData.hasOwnProperty(itemID)) {
        let itemData = prodChainData[itemID];
        let existingItemDemand = itemData["userIRPTU"];

        if (amount > existingItemDemand) {
            let err = Error("Cannot remove more user demand than the item already has, so must be less than or equal to " + existingItemDemand + "\n");
            throw err.stack;
        }
    }
    else {
    let err = Error("Cannot remove user demand from item that doesn't exist in the production chain\n");
    throw err.stack;
    }
}